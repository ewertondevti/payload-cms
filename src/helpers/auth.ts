import fs from 'fs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import path from 'path'

export const getAuthorization = (token: string) => `Bearer ${token}`

export async function generateRS256Token({ filePath, ...payload }: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    const privateKey = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')

    const options: jwt.SignOptions = {
      algorithm: 'RS256',
    }

    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err || !token) {
        reject(err || new Error('Falha ao gerar token'))
        return
      }
      resolve(token)
    })
  })
}

export async function verifyRS256Token(token: string, filePath: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    const publicKey = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')

    const options: jwt.VerifyOptions = {
      algorithms: ['RS256'],
    }

    jwt.verify(token, publicKey, options, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }
      resolve(decoded as JwtPayload)
    })
  })
}

export async function saveToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
}

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('token')?.value || null
}

export async function removeToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}
