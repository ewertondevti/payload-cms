import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import FormData from 'form-data'
import https from 'https'

const MOSPARO_URL = process.env.MOSPARO_URL_API
const MOSPARO_PUBLIC_KEY_TOKEN = process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY

const httpsAgent = new https.Agent({ rejectUnauthorized: true })

export async function POST() {
 try {
  const formData = new FormData()
  formData.append('publicKey', MOSPARO_PUBLIC_KEY_TOKEN)
  formData.append('pageTitle', 'mosparo Form')
  formData.append('pageUrl', 'http://localhost')

  const response = await fetch(`${MOSPARO_URL}/api/v1/frontend/request-submit-token`, {
   method: 'POST',
   body: formData,
   agent: httpsAgent,
   headers: {
    ...formData.getHeaders(),
   },
  })

  const responseText = await response.text()
  let data
  try {
   data = JSON.parse(responseText)
  } catch (jsonError) {
   throw new Error(`Invalid JSON response from Mosparo API: ${responseText}`)
  }

  if (!response.ok) {
   throw new Error(data.errorMessage || 'Failed to get submitToken')
  }

  return NextResponse.json({ submitToken: data.submitToken }, { status: 200 })
 } catch (err: any) {
  console.error('Error:', err.message)
  return NextResponse.json({ error: err.message || 'Failed to get submitToken' }, { status: 400 })
 }
}
