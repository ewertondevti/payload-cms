import { GetCertidaoResponse } from '@/models/certidao'
import axios from 'axios'

export const GetCertidao = async (codigoAcesso: string) => {
  const token = process.env.NEXT_PUBLIC_USER_TOKEN

  const { data } = await axios.get<GetCertidaoResponse>(
    'https://qld-apiv2.justica.gov.pt/CIVIL_Especificos/GetCertidao',
    { params: { codigoAcesso }, headers: { Authorization: `Bearer ${token}` } },
  )

  return data
}
