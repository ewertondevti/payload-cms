import { ResponseData } from '@/models/certificate'
import axios from 'axios'

export const getCertificate = async (apiurl: string, codigoAcesso: string) => {
  const token = process.env.NEXT_PUBLIC_USER_TOKEN

  const { data } = await axios.post<ResponseData>(String(apiurl), codigoAcesso, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  return data
}
