import { PayloadBody } from '@/models/api'
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

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
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const MOSPARO_PUBLIC_KEY = process.env.MOSPARO_PUBLIC_KEY
  const MOSPARO_PRIVATE_KEY = process.env.MOSPARO_PRIVATE_KEY
  const MOSPARO_URL = process.env.MOSPARO_URL_API

  try {
    const { submitToken, validationToken, formData } = req.body as PayloadBody

    console.log('[MosparoVerify] Received formData:', formData)
    // 1. Extrair tokens Mosparo

    if (!submitToken || !validationToken || !formData) {
      throw new Error('Submit token, Validation token or Form Data is missing!')
    }

    // 3. Gerar hashes SHA-256 para cada campo
    const hashedFormData: Record<string, string> = {}

    for (const key in formData) {
      hashedFormData[key] = sha256(formData[key])
    }

    // 4. Ordenar campos por chave (ordem alfabética)
    const sortedKeys = Object.keys(hashedFormData).sort()
    const sortedFormData: Record<string, string> = {}

    for (const key of sortedKeys) {
      sortedFormData[key] = hashedFormData[key]
    }

    // 5. Assinar dados do formulário
    const jsonFormData = JSON.stringify(sortedFormData)
    const formDataSignature = hmacSHA256(jsonFormData, MOSPARO_PRIVATE_KEY || '')

    // 6. Assinar token de validação
    const validationSignature = hmacSHA256(validationToken, MOSPARO_PRIVATE_KEY || '')
    console.log(validationSignature)
    // 7. Gerar assinatura de verificação combinada
    const combinedSignatures = validationSignature + formDataSignature
    console.log(combinedSignatures)
    const verificationSignature = hmacSHA256(combinedSignatures, MOSPARO_PRIVATE_KEY || '')

    // === CONFIGURAÇÃO DA REQUISIÇÃO À API MOSPARO ===

    // 8. Preparar payload para API
    const apiEndpoint = '/api/v1/verification/verify'
    const requestData = {
      submitToken,
      validationSignature,
      formSignature: formDataSignature,
      formData: sortedFormData,
    }

    // 9. Gerar assinatura HMAC para autenticação
    // Importante: De acordo com a documentação, o HMAC deve ser gerado a partir
    // do endpoint + dados do formulário serializados como JSON
    const hmacHash = hmacSHA256(
      apiEndpoint + JSON.stringify(sortedFormData), // Alterado para usar apenas sortedFormData conforme documentação
      MOSPARO_PRIVATE_KEY || '',
    )
    console.log('[MosparoVerify] Generated HMAC hash:', hmacHash)

    // 10. Construir header de autenticação
    const authString = `${MOSPARO_PUBLIC_KEY}:${hmacHash}`
    const authHeader = Buffer.from(authString).toString('base64')
    console.log('[MosparoVerify] Generated auth header:', authHeader)
    console.log('[MosparoVerify] Generated auth header:', authString)

    // 11. Fazer requisição para API Mosparo
    const response = await fetch(`${MOSPARO_URL}${apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`, // Formato correto para Basic Auth
      },
      body: JSON.stringify(requestData),
    })

    const responseData = await response.json()
    console.log('[MosparoVerify] Received submitToken:', submitToken)
    console.log('[MosparoVerify] Received validationToken:', validationToken)
    console.log('[MosparoVerify] Response:', responseData) // Log para depuração

    // 12. Verificar resposta
    if (response.ok) {
      const isValid =
        responseData.valid &&
        responseData.verificationSignature === verificationSignature &&
        responseData.verifiedFields

      if (isValid) {
        // Verificação bem-sucedida
        return NextResponse.json({
          valid: true,
          message: 'Form validation successful',
          details: responseData,
        })
      } else {
        // Falha na verificação (possível spam)
        return NextResponse.json(
          {
            valid: false,
            message: 'Form validation failed. Possible spam or manipulation.',
            details: responseData,
          },
          { status: 400 },
        )
      }
    } else {
      // Erro na API Mosparo
      return NextResponse.json(
        {
          error: true,
          message: 'Mosparo API error',
          details: responseData,
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
      { status: 500 },
    )
  }
}
