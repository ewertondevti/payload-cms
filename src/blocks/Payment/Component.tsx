'use client'
import { useState, useEffect } from 'react'
import ClickableImageCard from '@/components/ClickableImageCard'
import mbwayImage from '../../../public/MBway.png'
import multibancoImage from '../../../public/multibanco.png'
import visaImage from '../../../public/visa.png'
import mastercardImage from '../../../public/mastercard.png'
import { InputText, StatusCard, Switch } from '@ama-pt/agora-design-system'
import ServicesTable from './Components/ServicesTable'
import ReceiptData from './Components/ReceiptData'
import { StaticImageData } from 'next/image'
import { useFormContext } from 'react-hook-form'
import { getPaymentData } from '@/app/(frontend)/api/payments'

type Card = {
  images: StaticImageData[]
  title: string
  clicked?: boolean
}

interface PaymentProps {
  setPaymentMethod: (paymentMethod: string) => void
  validateFields: any
  userId: string
  serviceId: string
  orderId: string
  services: { description: string; value: string }[]
}

type PaymentData = {
  services: any[]
  urgencyFeeValue: string
  receiptData: { name: string; address: string }[]
}

const PaymentBlock = ({
  setPaymentMethod,
  validateFields,
  userId,
  serviceId,
  orderId,
  services,
}: PaymentProps) => {
  const [urgentFee, setUrgentFee] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData | undefined>(undefined)

  const {
    register,
    trigger,
    formState: { errors },
    setValue,
  } = useFormContext()

  const validatePaymentFields = async () => {
    const isValid = await trigger(['iban', 'swift'])
    return isValid
  }

  validateFields.current = validatePaymentFields

  const handlePaymentMethodChange = (clickedCard: Card) => {
    setPaymentMethod(clickedCard.title)
  }

  useEffect(() => {
    register('urgentFee', { value: urgentFee })

    const fetchData = async () => {
      try {
        const response = await getPaymentData(serviceId, userId, orderId)
        setPaymentData(response)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [serviceId, userId, orderId])

  return (
    <div className="w-[800px] p-6 flex-grow mx-auto">
      <form noValidate key="form">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-[32px] leading-[48px] text-[#021C51]">Pagamento</h1>
              <span className="font-normal text-[16px] leading-[28px] text-[#2B363C]">
                Valide as informações de pagamento para prosseguir.
              </span>
            </div>
          </div>
          <StatusCard
            type="warning"
            description="Após efetuar o pagamento não poderá alterar a informação prestada. Em caso de dúvida, antes de submeter o pedido, contacte os nossos serviços."
          />
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-[20px] leading-[32px] text-[#021C51]">
                Pedido Urgente?
              </h2>
              <span className="text-[#021C51] text-[16px] leading-[28px]">
                Os pedidos urgentes são tratados em 1 dia útil após a confirmação do pagamento.
              </span>
            </div>
            <div className="flex border border-[#E1E4EA] p-8 items-center justify-between">
              <Switch
                id="urgentFee"
                label="Adicionar taxa de urgência"
                onChange={() => {
                  setUrgentFee(!urgentFee)
                  setValue('urgentFee', !urgentFee)
                }}
                checked={urgentFee}
              />
              <p className="font-semibold text-xl">+ {paymentData?.urgencyFeeValue} €</p>
            </div>
          </div>
          <ServicesTable
            urgencyFee={urgentFee ? paymentData?.urgencyFeeValue : undefined}
            services={services}
          />
          <ReceiptData
            receiptOptions={paymentData?.receiptData || []}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-[20px] leading-[32px] text-[#021C51]">
              Dados em caso de reembolso
            </h2>
            <span className="text-[#021C51] text-[16px] leading-[28px]">
              Em caso de necessidade de reembolso, o pagamento será feito por transferência para a
              conta bancária indicada.
            </span>
            <div className="flex flex-row gap-8">
              <div className="w-full">
                <InputText
                  label="IBAN (Opcional)"
                  placeholder="Indique o IBAN"
                  hasFeedback
                  hasError={errors.iban ? true : false}
                  feedbackState="danger"
                  feedbackText={errors.iban?.message?.toString()}
                  {...register('iban', {
                    pattern: {
                      value: /^PT\d{2}(\s?\d{4}){5}\s?\d{1}$/,
                      message: 'IBAN inválido',
                    },
                  })}
                />
              </div>
              <div className="w-1/3">
                <InputText
                  label="SWIFT (Opcional)"
                  placeholder="Indique o SWIFT"
                  hasFeedback
                  hasError={errors.swift ? true : false}
                  feedbackState="danger"
                  feedbackText={errors.swift?.message?.toString()}
                  {...register('swift', {
                    pattern: {
                      value: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
                      message: 'SWIFT inválido',
                    },
                  })}
                />
              </div>
            </div>
          </div>
          <ClickableImageCard
            cards={[
              {
                images: [multibancoImage],
                title: 'Multibanco',
              },
              {
                images: [mbwayImage],
                title: 'MBWay',
              },
              {
                images: [mastercardImage, visaImage],
                title: 'Visa / Mastercard',
              },
            ]}
            onChange={handlePaymentMethodChange}
          />
        </div>
      </form>
    </div>
  )
}

export default PaymentBlock
