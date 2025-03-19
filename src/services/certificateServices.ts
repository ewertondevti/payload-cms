import { GetCertidaoResponse } from '@/models/certificate'
import axios from 'axios'

export const getCertificate = async (apiurl: string, CertidaoId: string) => {
  const { data } = await axios.get<GetCertidaoResponse>(String(apiurl), { params: { CertidaoId } })
  return data
}
