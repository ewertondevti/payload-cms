import {
  generateRS256Token,
  getAuthorization,
  getToken,
  saveToken,
  verifyRS256Token,
} from '@/helpers/auth'
import axios from 'axios'
import { JwtPayload } from 'jsonwebtoken'

const api = axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 10000, // 10s
})

api.interceptors.request.use(async (configs) => {
  const key = process.env.JWT_KEY
  const privateKeyPath = process.env.JWT_PRIVATE_KEY_PATH
  const publicKeyPath = process.env.JWT_PUBLIC_KEY_PATH

  if (key && privateKeyPath && publicKeyPath) {
    const storedToken = await getToken()

    const payload: JwtPayload = {
      key,
      /**
       * @param exp Valor númerico em SEGUNDOS
       * Este valor está a corresponder á 40 minutos a partir da hora atual
       */
      exp: Math.floor(Date.now() / 1000) + 60 * 40,
      filePath: privateKeyPath,
    }

    if (storedToken) {
      try {
        const isValid = await verifyRS256Token(storedToken, publicKeyPath)

        if (!isValid) {
          const token = await generateRS256Token(payload)

          saveToken(token)
          configs.headers.Authorization = getAuthorization(token)
        } else configs.headers.Authorization = getAuthorization(storedToken)
      } catch (error) {
        console.error(error)
      }
    } else {
      const token = await generateRS256Token(payload)
      configs.headers.Authorization = getAuthorization(token)

      saveToken(token)
    }
  }

  return configs
})

export default api
