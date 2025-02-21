'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ClickableImageCard from '@/components/ClickableImageCard'
import mastercardImage from '../../../public/mastercard.png'
import visaImage from '../../../public/visa.png'
import mbwayImage from '../../../public/MBway.png'
import multibancoImage from '../../../public/multibanco.png'
import ReadOnlyTextFieldBorder from '@/components/ReadOnlyTextFieldBorder'
import ReadOnlyTextField from '@/components/ReadOnlyText'
import { StatusCard } from '@ama-pt/agora-design-system'
import { PaymentResponse } from '@/types/payment'
import { checkPaymentStatus } from '@/app/(frontend)/api/payments'
import RequestSummary from './Components/RequestSummary'
import DownloadRequest from './Components/Download'
import { getSubmissionData } from '@/app/(frontend)/api/payments'
import IRN_logo from '../../../public/IRNlogo_color.png'

interface SubmissionProps {
  data: PaymentResponse
  paymentMethod: string
  paymentStatus: string
  services: any
  requestNumber: string
  userId: string
  serviceId: string
  orderId: string
}

type SubmissionData = {
  urgencyFeeValue: string
  identification: any
}

const SubmissionBlock = ({
  data,
  paymentMethod,
  paymentStatus,
  services,
  requestNumber,
  userId,
  serviceId,
  orderId,
}: SubmissionProps) => {
  const { mensagem, dadosPesquisa } = data
  const [paymentStatusUpdated, setPaymentStatus] = useState(paymentStatus || '0')
  const [submissionData, setSubmissionData] = useState<SubmissionData | undefined>({
    urgencyFeeValue: '',
    identification: {},
  })

  const dateTime = new Date()
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })
    .replace(',', ' UTC')
    .replace(/\//g, '-')

  const status = () => {
    switch (paymentStatusUpdated) {
      case '0':
        return 'Pendente'
      case '1':
        return 'Autorizado'
      case '2':
        return 'Capturado'
      case '3':
        return 'Creditado'
      case '4':
        return 'Cancelado'
      default:
        return ''
    }
  }

  const date = new Date('dataExpiracao' in dadosPesquisa ? dadosPesquisa.dataExpiracao : '')
  const dateToShow = date
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(',', ' UTC')
    .replace(/\//g, '-')

  const today = new Date()
  const timeDifference = date.getTime() - today.getTime()
  const numberOfDaysToPay = Math.ceil(timeDifference / (1000 * 3600 * 24))

  const cards = [
    {
      images: [multibancoImage],
      title: 'Multibanco',
    },
    {
      images: [mbwayImage],
      title: 'MBWay',
    },
    {
      images: [visaImage],
      title: 'Visa',
    },
    {
      images: [mastercardImage],
      title: 'Mastercard',
    },
  ]

  const selectedCard =
    cards.find((card) => card.title.toLocaleLowerCase() === paymentMethod.toLocaleLowerCase()) ||
    cards[0]

  const renderStatusCard = () => {
    return paymentMethod.toLowerCase() === 'mbway' ? (
      <StatusCard
        type="warning"
        description="Os pedidos com método MB WAY só serão tratados após confirmação do pagamento."
      />
    ) : paymentMethod.toLowerCase() === 'multibanco' ? (
      <StatusCard
        type="warning"
        description={`Os pedidos com método Multibanco só serão tratados após confirmação do pagamento. Relembramos que tem ${numberOfDaysToPay} dias para concluir o pagamento. As instruções também foram enviadas para o seu e-mail.`}
      />
    ) : (
      <></>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubmissionData(serviceId, userId, orderId)
        setSubmissionData(response)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [serviceId, userId, orderId])

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkPaymentStatus({
        cabecalho: {
          nome_do_servico: paymentMethod,
          id_utilizador: '123',
          comunicacao: {
            idMensagemExterna: '123',
          },
        },
        argumentos: {
          transacaoIds: {
            transacaoId: [dadosPesquisa.transaccaoId],
          },
        },
      }).then((response) => {
        setPaymentStatus(response.data.dadosPesquisa.transacao.idEstado)
      })
    }, 35000)
    return () => clearInterval(intervalId)
  }, [paymentMethod, dadosPesquisa.transaccaoId])

  return (
    <div className="w-[800px] p-6 flex-grow mx-auto">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-[32px] leading-[48px] text-[#021C51]">
            O seu pedido foi submetido corretamente
          </h1>
          <div className="text-[16px] leading-[28px] text-[#2B363C] font-normal">
            <p>Obrigada por utilizar os nossos serviços.</p>
            <ul className="list-disc list-outside pl-5 py-8">
              <li>Irá receber um email com a informação do seu pedido.</li>
              <li>Pode consultar os detalhes e acompanhar o estado na Área Reservada.</li>
            </ul>
            <p>Agradecemos por utilizar os nossos serviços online.</p>
            <p>Equipa IRN.</p>
          </div>
        </div>
        <Image src={IRN_logo} alt="IRN Logo" />
        <h2 className="font-semibold text-[24px] leading-[36px] text-[#021C51]">
          Entidade Responsável
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-8">
            <ReadOnlyTextFieldBorder
              label="Entidade"
              value="Instituto dos Registos e do Notariado, I.P."
            />
            <ReadOnlyTextFieldBorder label="NIF / NIPC" value="508184258" />
          </div>
          <ReadOnlyTextFieldBorder
            label="Sede"
            value="Av: D. João II, n.º 1.8.01D, Campus da Justiça, Edifício H, Apartado 8295, 1803-001 Lisboa"
          />
        </div>
        <h2 className="font-semibold text-[24px] leading-[36px] text-[#021C51]">
          Detalhes do pedido online
        </h2>
        <div className="flex flex-row justify-between">
          <ReadOnlyTextField label="Número do Pedido" value={requestNumber} />
          <ReadOnlyTextField label="Data e Hora" value={dateTime} />
        </div>
        <RequestSummary
          services={services}
          urgencyFee={submissionData?.urgencyFeeValue}
          requestNumber={requestNumber}
        />
        <div className="flex flex-col gap-8">
          <h2 className="font-semibold text-[24px] leading-[36px] text-[#021C51]">
            Resumo do Pagamento
          </h2>
          <div className="flex flex-row gap-8">
            <div className="w-1/3">
              <ClickableImageCard cards={[selectedCard]} clickable={false} />
            </div>
            <ReadOnlyTextFieldBorder label="Estado do Pagamento" value={status()} light />
            <ReadOnlyTextFieldBorder
              label="Total"
              value={Number(services[0].value) + Number(submissionData?.urgencyFeeValue) + '€'}
              light
            />
          </div>
          {renderStatusCard()}
          {paymentMethod.toLowerCase() === 'multibanco' && (
            <div className="flex flex-col gap-8">
              <h3 className="font-bold text-[16px] leading-[28px] text-[#2B363C]">
                Instruções para concluir o pagamento
              </h3>
              <div className="flex flex-row gap-8">
                <ReadOnlyTextFieldBorder
                  label="Entidade"
                  value={'entidadeNumero' in dadosPesquisa ? dadosPesquisa.entidadeNumero : ''}
                  light
                />
                <ReadOnlyTextFieldBorder
                  label="Referência"
                  value={'referencia' in dadosPesquisa ? dadosPesquisa.referencia : ''}
                  light
                />
              </div>
              <div className="flex flex-row gap-8">
                <ReadOnlyTextFieldBorder
                  label="Valor"
                  value={Number(services[0].value) + Number(submissionData?.urgencyFeeValue) + '€'}
                  light
                />
                <ReadOnlyTextFieldBorder
                  label="Data limite para pagamento"
                  value={dateToShow}
                  light
                />
              </div>
              <div className="flex flex-col gap-2 text-[16px] leading-[28px] text-[#2B363C] font-normal">
                <p>
                  Para proceder ao pagamento do serviço no Multibanco, siga os seguintes passos:
                </p>
                <ol className="list-decimal list-inside">
                  <li>Escolha a opção &apos;Pagamentos&apos;;</li>
                  <li>Escolha a opção &apos;Pagamentos de Serviços&apos;;</li>
                  <li>Introduza o código da Entendidade, Referência e Valor;</li>
                  <li>Guarde o seu talão juntamente com o presente comprovativo.</li>
                </ol>
              </div>
            </div>
          )}
          <h2 className="font-semibold text-[24px] leading-[36px] text-[#021C51]">Documentos</h2>
          <DownloadRequest
            identifcationData={submissionData?.identification}
            services={services}
            requestNumber={requestNumber}
            urgencyFee={submissionData?.urgencyFeeValue}
            paymentData={{
              paymentMethod: paymentMethod,
              entity: 'entidadeNumero' in dadosPesquisa ? dadosPesquisa.entidadeNumero : '',
              reference: 'referencia' in dadosPesquisa ? dadosPesquisa.referencia : '',
              value: dadosPesquisa.montante,
              expirationDate: dateToShow,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SubmissionBlock
