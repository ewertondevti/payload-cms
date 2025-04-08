// /app/api/verify/route.ts (Next.js 13 ou 14 App Router)
import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const MOSPARO_URL = process.env.MOSPARO_URL_API
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY!
const PRIVATE_KEY = process.env.MOSPARO_PRIVATE_KEY!

export async function POST(request: Request) {
 try {
  const {
   submitToken,
   validationSignature,
   formSignature,
   formData
  } = await request.json()

  if (!submitToken || !validationSignature || !formSignature || !formData) {
   return NextResponse.json(
    { error: true, errorMessage: 'Campos obrigatórios ausentes' },
    { status: 400 }
   )
  }

  const endpoint = '/api/v1/verification/verify'
  const hmacHash = createHmac('sha256', PRIVATE_KEY)
   .update(endpoint + JSON.stringify(formData))
   .digest('hex')

  const authHeader = Buffer.from(`${PUBLIC_KEY}:${hmacHash}`).toString('base64')

  const res = await fetch(`${MOSPARO_URL}${endpoint}`, {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${authHeader}`
   },
   body: JSON.stringify({
    submitToken,
    validationSignature,
    formSignature,
    formData
   })
  })

  const data = await res.json()

  if (!res.ok || data.error || data.valid === false) {
   return NextResponse.json({
    error: true,
    errorMessage: data.errorMessage || 'Verificação falhou',
    data
   }, { status: 400 })
  }

  return NextResponse.json({ ...data, valid: true }, { status: 200 })

 } catch (err: any) {
  console.error("[Mosparo Verify] Erro:", err)
  return NextResponse.json(
   { error: true, errorMessage: err?.message || "Erro inesperado" },
   { status: 500 }
  )
 }
}
