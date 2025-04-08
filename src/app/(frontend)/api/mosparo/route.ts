import { NextResponse } from 'next/server'
import fetch from 'node-fetch'
import FormData from 'form-data'
import https from 'https'
import { createHmac } from 'crypto'

// Se você tiver um SSL autoassinado no Mosparo, deixe rejectUnauthorized como false.
// Caso contrário, pode remover esse agente.
const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const MOSPARO_URL = process.env.MOSPARO_URL_API
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY || ''
const PRIVATE_KEY = process.env.MOSPARO_PRIVATE_KEY || ''

export async function POST(request: Request) {
 try {
  // Lê o body JSON enviado pelo front-end
  const body = await request.json()
  const { action } = body

  if (!action) {
   return NextResponse.json(
    { error: true, errorMessage: 'Missing "action" in request body' },
    { status: 400 }
   )
  }

  // ----------------------------------------------------------------
  // 1) Ação = "request-submit-token"
  //    Chama /api/v1/frontend/request-submit-token e retorna { submitToken }
  // ----------------------------------------------------------------
  if (action === 'request-submit-token') {
   const formData = new FormData()
   formData.append('publicKey', PUBLIC_KEY)
   formData.append('pageTitle', 'mosparo Form')
   formData.append('pageUrl', 'http://localhost') // ajuste se quiser

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

   if (!response.ok || data.error) {
    throw new Error(data.errorMessage || 'Failed to get submitToken')
   }

   return NextResponse.json({ submitToken: data.submitToken }, { status: 200 })
  }

  // ----------------------------------------------------------------
  // 2) Ação = "check-form-data"
  //    Chama /api/v1/frontend/check-form-data no Mosparo
  // ----------------------------------------------------------------
  if (action === 'check-form-data') {
   const { submitToken, formData } = body
   if (!submitToken || !formData) {
    return NextResponse.json(
     { error: true, errorMessage: 'Missing fields for check-form-data' },
     { status: 400 }
    )
   }

   const fd = new FormData()
   fd.append('publicKey', PUBLIC_KEY)
   fd.append('submitToken', submitToken)
   fd.append('formData', JSON.stringify(formData))

   const response = await fetch(`${MOSPARO_URL}/api/v1/frontend/check-form-data`, {
    method: 'POST',
    agent: httpsAgent,
    body: fd,
    headers: {
     ...fd.getHeaders(),
    },
   })

   const responseText = await response.text()
   let data
   try {
    data = JSON.parse(responseText)
   } catch (err) {
    throw new Error(`Invalid JSON response from Mosparo API: ${responseText}`)
   }

   // Retorna o objeto do Mosparo (ex.: { valid: true, error: false, ... })
   return NextResponse.json(data, { status: 200 })
  }

  // ----------------------------------------------------------------
  // 3) Ação = "verify"
  //    Chama /api/v1/verification/verify (HMAC + Basic Auth)
  // ----------------------------------------------------------------
  if (action === 'verify') {
   const { submitToken, validationSignature, formSignature, formData } = body
   if (!submitToken || !validationSignature || !formSignature || !formData) {
    return NextResponse.json(
     { error: true, errorMessage: 'Campos ausentes para verificação' },
     { status: 400 }
    )
   }

   const apiEndpoint = '/api/v1/verification/verify'

   // Gerar o HMAC local: endpoint + JSON(formData)
   const hmacHash = createHmac('sha256', PRIVATE_KEY)
    .update(apiEndpoint + JSON.stringify(formData))
    .digest('hex')

   // Cabeçalho Basic base64("<PUBLIC_KEY>:<hmacHash>")
   const authHeader = Buffer.from(`${PUBLIC_KEY}:${hmacHash}`).toString('base64')

   const verifyRes = await fetch(`${MOSPARO_URL}${apiEndpoint}`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Basic ${authHeader}`,
    },
    body: JSON.stringify({
     submitToken,
     validationSignature,
     formSignature,
     formData,
    }),
    agent: httpsAgent,
   })

   const verifyJson = await verifyRes.json()

   if (!verifyRes.ok || verifyJson.error) {
    return NextResponse.json(
     { error: true, errorMessage: verifyJson.errorMessage || 'Falha na verificação', data: verifyJson },
     { status: 400 }
    )
   }

   // Se chegou aqui, verificação bem-sucedida
   return NextResponse.json(verifyJson, { status: 200 })
  }

  // Se "action" for algo inválido
  return NextResponse.json(
   { error: true, errorMessage: `Unknown action "${action}"` },
   { status: 400 }
  )
 } catch (err: any) {
  console.error('Error in /api/mosparo:', err)
  return NextResponse.json({ error: true, errorMessage: err.message }, { status: 500 })
 }
}