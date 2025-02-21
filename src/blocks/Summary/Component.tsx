'use client'
import { useEffect, useState } from 'react'
import { getIdentificationData, getBirthCertificateData } from '@/app/(frontend)/api/summary'

interface SummaryProps {
    services: string
    userId: string
    serviceId: string
    orderId: string
}

type IdentificationData = {
    name: string
    document: string
    documentNr: string
    nif: string,
    address: string
    email: string
    phone: string
}

type BirthCertificateData = {
    nameBirthCertificate: string
    documentBirthCertificate: string
    documentNrBirthCertificate: string
    idDigitBirthCertificate: string
    registryYearBirthCertificate: string
    exactDateBirthCertificate: string
    birthYearBirthCertificate: string
    fatherNameBirthCertificate: string
    motherNameBirthCertificate: string
    additionalInfoBirthCertificate: string
}
  
const SummaryBlock = ({
    services,
    userId,
    serviceId,
    orderId
}: SummaryProps) => {
      const [identificationData, setIdentificationData] = useState<IdentificationData | undefined>(undefined)
      const [birthCertificateData, setBirthCertificateData] = useState<BirthCertificateData | undefined>(undefined)
      
      console.log("Ident. ", identificationData)
      console.log("Birth. ", birthCertificateData)
      
      useEffect(() => {
        const fetchIdentificationData = async () => {
          try {
            const response = await getIdentificationData(serviceId, userId, orderId)
            setIdentificationData(response)
          } catch (err) {
            console.log(err)
          }
        }
        const fetchBirthCertificateData = async () => {
            try {
              const response = await getBirthCertificateData(serviceId, userId, orderId)
              setBirthCertificateData(response)
            } catch (err) {
              console.log(err)
            }
        }
        fetchIdentificationData()
        fetchBirthCertificateData()
      }, [serviceId, userId, orderId])

    return (
        <div className="w-[800px] p-6 flex-grow mx-auto">
            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-[32px] leading-[48px] text-[#021C51]">Resumo do pedido</h1>
                    <div className="text-[16px] leading-[28px] text-[#2B363C] font-normal">
                        <p>Verifique se a informação do seu pedido está correta.</p>
                    </div>
                </div>
                <h2 className="font-bold text-xl text-[#021C51]">{services}</h2>
                <div>
                    <h3 className="font-bold text-base text-[#021C51]">Dados de identificação</h3>
                    <p>Nome completo: {identificationData?.name}</p>
                    <p>Documento de identificação: {identificationData?.document}</p>
                    <p>Número do documento: {identificationData?.documentNr}</p>
                    <p>Número de Identificação Fiscal (NIF): {identificationData?.nif}</p>  
                </div>
                <div>
                    <h3 className="font-bold text-base text-[#021C51]">Dados de morada</h3>
                    <p>Morada: {identificationData?.address}</p>
                </div>
                <div>
                    <h3 className="font-bold text-base text-[#021C51]">Dados de contacto</h3>
                    <p>E-mail: {identificationData?.email}</p>
                    <p>Contacto telefónico: {identificationData?.phone}</p>
                </div>
                <div>
                    <h3 className="font-bold text-base text-[#021C51]">Certidão de nascimento</h3>
                    <p>Nome completo: {birthCertificateData?.nameBirthCertificate}</p>
                    <p>Documento de identificação: {birthCertificateData?.documentBirthCertificate}</p>
                    <p>Número do documento: {birthCertificateData?.documentNrBirthCertificate}</p>
                    <p>Dígito de verificação: {birthCertificateData?.idDigitBirthCertificate}</p>
                </div>
                <div>
                    <h3 className="font-bold text-base text-[#021C51]">Dados do registo</h3>
                    <p>Número / ano do registo: {birthCertificateData?.registryYearBirthCertificate}</p>
                    <p>Sei a data exata do nascimento?: {birthCertificateData?.exactDateBirthCertificate}</p>
                    <p>Ano de nascimento: {birthCertificateData?.birthYearBirthCertificate}</p>
                    <p>Nome completo do pai: {birthCertificateData?.fatherNameBirthCertificate}</p>
                    <p>Nome completo da mãe: {birthCertificateData?.motherNameBirthCertificate}</p>
                    <p>Informação adicional: {birthCertificateData?.additionalInfoBirthCertificate}</p>
                </div>
            </div>
        </div>
    )
}

export default SummaryBlock
