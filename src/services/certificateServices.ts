import { GetCertidaoResponse } from '@/models/certificate'
import axios from 'axios'

export const obterCertidao = async (codigoAcesso: string) => {
  const url = process.env.NEXT_PUBLIC_CONSULT_URL

  const { data } = await axios.get<GetCertidaoResponse>(String(url), { params: { codigoAcesso } })
  return data
}
