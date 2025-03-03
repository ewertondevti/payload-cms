import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import FormData from 'form-data'
import https from 'https'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const MOSPARO_URL = 'https://mosparo.irn.internal'

/**
 * POST /api/mosparo-check
 * Expects JSON body: { publicKey, submitToken, formData }
 *   - publicKey: string
 *   - submitToken: string
 *   - formData: { fields: [...], ignoredFields: [...] }
 */
export async function POST(request: Request) {
  try {
    const { publicKey, submitToken, formData } = await request.json()

    if (!publicKey || !submitToken || !formData) {
      return NextResponse.json(
        { error: 'Missing publicKey, submitToken, or formData' },
        { status: 400 }
      )
    }

    const bodyFormData = new FormData()
    bodyFormData.append('publicKey', publicKey)
    bodyFormData.append('submitToken', submitToken)
    bodyFormData.append('formData', JSON.stringify(formData))

    const response = await fetch(`${MOSPARO_URL}/api/v1/frontend/check-form-data`, {
      method: 'POST',
      body: bodyFormData,
      agent: httpsAgent,
      headers: {
        ...bodyFormData.getHeaders()
      }
    })

    const responseText = await response.text()

    let data
    try {
      data = JSON.parse(responseText)
    } catch (err) {
      throw new Error(`Invalid JSON response from Mosparo API: ${responseText}`)
    }

    if (!response.ok) {
      throw new Error(data.error || data.errorMessage || 'Erro na validação')
    }

    return NextResponse.json({ message: data.message, data }, { status: 200 })
  } catch (err: any) {
    console.error('Error in /api/mosparo-check:', err.message)
    return NextResponse.json(
      { error: err.message || 'Erro inesperado na validação' },
      { status: 400 }
    )
  }
}
