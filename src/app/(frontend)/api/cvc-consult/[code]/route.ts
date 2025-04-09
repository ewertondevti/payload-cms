// app/api/your-endpoint/route.ts
import api from '@/services/axiosConfig'
import axios from 'axios'
import https from 'https'
import { NextRequest, NextResponse } from 'next/server'
import {
  createLogError,
  createLogResponse,
  endSpan,
  startSpan,
} from '../../../../../../../art-cvt-react-common/src/otel'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export async function GET(request: NextRequest, context: { params: Promise<{ code?: string }> }) {
  startSpan('span-teste')

  try {
    const { code } = await context.params

    if (!code) {
      const errorPayload = {
        logMessage: 'Parâmetro "code" não fornecido',
        error: {
          status: 400,
          message: 'Parâmetro "code" não fornecido',
        },
      }

      createLogError(errorPayload.logMessage, errorPayload.error)
      return NextResponse.json({ error: 'Parâmetro "code" não fornecido' }, { status: 400 })
    }

    if (!process.env.CVC_CONSULTA_API_URL) {
      const errorPayload = {
        logMessage: 'URL da API não configurada',
        error: {
          status: 400,
          message: 'URL da API não configurada',
        },
      }

      createLogError(errorPayload.logMessage, errorPayload.error)

      throw new Error('URL da API não configurada')
    }

    const response = await api.get(process.env.CVC_CONSULTA_API_URL, {
      params: { codigoAcesso: code },
      httpsAgent,
    })

    createLogResponse('Consulta feita com sucesso!', request, response)

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Erro na chamada da API:', error)

    if (axios.isAxiosError(error)) {
      const errorPayload = {
        logMessage: 'Erro na chamada da API externa',
        error: {
          status: error.response?.status || 500,
          message: error.message,
        },
      }

      createLogError(errorPayload.logMessage, errorPayload.error)

      return NextResponse.json(
        {
          error: 'Erro na chamada da API externa',
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 },
      )
    }

    const errorPayload = {
      logMessage: 'Erro interno no servidor',
      error: {
        status: 500,
        message: 'Erro interno no servidor',
      },
    }

    createLogError(errorPayload.logMessage, errorPayload.error)

    endSpan()
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
  }
}
