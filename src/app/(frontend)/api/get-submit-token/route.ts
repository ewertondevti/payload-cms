import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import FormData from 'form-data'
import https from 'https'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })
const MOSPARO_URL = process.env.MOSPARO_URL_API

export async function POST(request: Request) {
  try {
    const { publicKey, submitToken, formData } = await request.json()
    if (!publicKey || !submitToken || !formData) {
      return NextResponse.json({ error: 'Missing required fields', valid: false }, { status: 400 })
    }
    const bodyFormData = new FormData()
    bodyFormData.append('publicKey', publicKey)
    bodyFormData.append('submitToken', submitToken)
    bodyFormData.append('formData', JSON.stringify(formData))
    const response = await fetch(`${MOSPARO_URL}/api/v1/frontend/check-form-data`, {
      method: 'POST',
      body: bodyFormData,
      agent: httpsAgent,
      headers: { ...bodyFormData.getHeaders() }
    })
    const responseText = await response.text()
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      throw new Error(`Invalid JSON response from Mosparo API: ${responseText}`)
    }
    if (!response.ok) {
      return NextResponse.json({ error: data.error || data.errorMessage || 'Validation error', valid: false }, { status: 200 })
    }
    return NextResponse.json({ message: data.message, valid: data.valid === true, data }, { status: 200 })
  } catch (err: any) {
    console.error('Error in validation:', err.message)
    return NextResponse.json({ error: err.message || 'Unexpected validation error', valid: false }, { status: 200 })
  }
}
