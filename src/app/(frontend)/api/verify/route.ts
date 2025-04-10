import axios from 'axios'
import crypto from 'crypto'
import https from 'https'
import type { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

/**
 * Calcula o hash SHA-256 de uma string
 * @param value Valor a ser hasheado
 * @returns String hexadecimal do hash
 */
function sha256(value: string): string {
  return crypto
    .createHash('sha256')
    .update(value || '')
    .digest('hex')
}

/**
 * Calcula o HMAC SHA-256 de uma string usando uma chave
 * @param value Valor a ser hasheado
 * @param key Chave para HMAC
 * @returns String hexadecimal do HMAC
 */
function hmacSHA256(value: string, key: string): string {
  return crypto.createHmac('sha256', key).update(value).digest('hex')
}

/**
 * Handler principal para verificação de formulários com Mosparo
 */
export async function POST(req: NextRequest, res: NextApiResponse) {
  const MOSPARO_PUBLIC_KEY = process.env.MOSPARO_PUBLIC_KEY
  const MOSPARO_PRIVATE_KEY = process.env.MOSPARO_PRIVATE_KEY
  const MOSPARO_URL = process.env.MOSPARO_URL_API

  if (!MOSPARO_PUBLIC_KEY || !MOSPARO_PRIVATE_KEY || !MOSPARO_URL) {
    console.error('Mosparo configuration missing')
    return NextResponse.json(
      { error: true, message: 'Mosparo configuration missing' },
      { status: 500 }
    )
  }

  try {
    const formData = await req.json()


    if (!formData['_mosparo_submitToken'] || !formData['_mosparo_validationToken']) {
      return NextResponse.json({ error: true, message: 'Mosparo tokens missing' }, { status: 400 })
    }

    const submitToken = formData['_mosparo_submitToken']
    const validationToken = formData['_mosparo_validationToken']

    // Extrair e preparar os dados do formulário (excluindo campos internos do Mosparo)
    const preparedFormData: Record<string, string> = {}
    for (const key in formData) {
      // Pular campos internos do Mosparo
      if (key.startsWith('_mosparo_')) {
        continue
      }

      // Normalizar quebras de linha e garantir que são strings
      const value = formData[key]
      if (typeof value === 'string') {
        preparedFormData[key] = value.replace(/\r\n/g, '\n')
      } else if (value !== null && value !== undefined) {
        preparedFormData[key] = String(value)
      }
    }

    // Hashear os dados preparados
    const hashedFormData: Record<string, string> = {}
    for (const key in preparedFormData) {
      hashedFormData[key] = sha256(preparedFormData[key])
    }

    // Ordenar as chaves alfabeticamente
    const sortedKeys = Object.keys(hashedFormData).sort()
    const sortedFormData: Record<string, string> = {}

    for (const key of sortedKeys) {
      sortedFormData[key] = hashedFormData[key]
    }

    // Serializar e assinar os dados do formulário
    const jsonFormData = JSON.stringify(sortedFormData)
    const formDataSignature = hmacSHA256(jsonFormData, MOSPARO_PRIVATE_KEY)

    // Gerar assinatura de validação
    const validationSignature = hmacSHA256(validationToken, MOSPARO_PRIVATE_KEY)

    // Gerar assinatura de verificação combinada
    const combinedSignatures = validationSignature + formDataSignature
    const verificationSignature = hmacSHA256(combinedSignatures, MOSPARO_PRIVATE_KEY)

    // Construir payload para API Mosparo
    const apiEndpoint = '/api/v1/verification/verify'
    const requestData = {
      submitToken,
      validationSignature,
      formSignature: formDataSignature,
      formData: sortedFormData,
    }


    // Gerar assinatura HMAC para autenticação com o endpoint
    const hmacHash = hmacSHA256(
      apiEndpoint + JSON.stringify(requestData),
      MOSPARO_PRIVATE_KEY
    )

    // Construir header de autenticação
    const authString = `${MOSPARO_PUBLIC_KEY}:${hmacHash}`
    const authHeader = Buffer.from(authString).toString('base64')

    try {
      const response = await axios.post(`${MOSPARO_URL}${apiEndpoint}`, requestData, {
        httpsAgent,
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/json'
        },
      })

      const data = response.data

      if (data) {
        const isValid =
          data.valid &&
          data.verificationSignature === verificationSignature &&
          data.verifiedFields

        if (isValid) {
          return NextResponse.json({
            valid: true,
            message: 'Form validation successful',
            details: data,
          })
        } else {
          return NextResponse.json(
            {
              valid: false,
              message: 'Form validation failed. Possible spam or manipulation.',
              details: data,
            },
            { status: 400 }
          )
        }
      } else {
        return NextResponse.json(
          {
            error: true,
            message: 'Mosparo API returned empty response',
            details: data,
          },
          { status: 400 }
        )
      }
    } catch (apiError: any) {
      console.error('Mosparo API request failed:', apiError.response?.data || apiError.message)
      return NextResponse.json(
        {
          message: 'Mosparo API request failed',
          details: apiError.response?.data || apiError.message,
        },
        { status: 400 },
      )
    }
  } catch (err: any) {
    console.error('[MosparoVerify] Error:', err)
    return NextResponse.json(
      {
        error: true,
        message: err.message || 'Internal server error',
      },
      { status: 500 }
    )
  }
}