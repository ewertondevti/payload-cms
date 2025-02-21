import { PaymentRequest, PaymentStatusRequest } from '@/types/payment'
import { getGetStepInfoServiceOrder } from '.'
import { countryOptions } from '@/blocks/Form/Country/options'

const getFieldValue = (formData: any[], field: string): string => {
  const fieldItem = formData.find((item: { field: string }) => item.field === field)
  return fieldItem ? fieldItem.value : ''
}

export const getPaymentData = async (serviceId: string, userId: string, orderId: string) => {
  try {
    const identificationStepData = await getGetStepInfoServiceOrder({
      userId,
      serviceId,
      stepIndex: 1,
      orderId,
    })

    const identificationFormData = JSON.parse(identificationStepData.formdata)

    const cvtNomeField = getFieldValue(identificationFormData, 'cvtNome')
    const cvtMorada = getFieldValue(identificationFormData, 'cvtMorada')
    const cvtCodPostal = getFieldValue(identificationFormData, 'cvtCodPostal')
    const cvtLocalidade = getFieldValue(identificationFormData, 'cvtLocalidade')
    const cvtEstrangeira = getFieldValue(identificationFormData, 'cvtEstrangeira')
    const cvtResidencia = getFieldValue(identificationFormData, 'cvtResidencia')
    const country = countryOptions.find((option) => option.value === cvtResidencia)
    const countryLabel = country ? country.label : ''

    // se for morada estrangeira
    const address =
      cvtResidencia === 'PT'
        ? [cvtMorada, cvtCodPostal, cvtLocalidade].join(', ')
        : [cvtEstrangeira, countryLabel].join(', ')

    const data = {
      urgencyFeeValue: '2.45',
      services: [
        { description: 'Serviço 1', value: '12' },
        { description: 'Serviço 2', value: '20' },
      ],
      receiptData: [{ name: cvtNomeField, address }],
    }

    return data
  } catch (e) {
    console.error('Error fetching payment data:', e)
    throw new Error('Failed to fetch payment data')
  }
}

export const getSubmissionData = async (serviceId: string, userId: string, orderId: string) => {
  try {
    const identificationStepData = await getGetStepInfoServiceOrder({
      userId,
      serviceId,
      stepIndex: 1,
      orderId,
    })

    const identificationFormData = JSON.parse(identificationStepData?.formdata)

    let cvtNomeField = getFieldValue(identificationFormData, 'cvtNome')
    let cvtMorada = getFieldValue(identificationFormData, 'cvtMorada')
    let cvtCodPostal = getFieldValue(identificationFormData, 'cvtCodPostal')
    let cvtLocalidade = getFieldValue(identificationFormData, 'cvtLocalidade')
    let cvtNIF = getFieldValue(identificationFormData, 'cvtNIF')
    let cvtEstrangeira = getFieldValue(identificationFormData, 'cvtEstrangeira')
    let cvtResidencia = getFieldValue(identificationFormData, 'cvtResidencia')

    const paymentStepData = await getGetStepInfoServiceOrder({
      userId,
      serviceId,
      stepIndex: 4,
      orderId,
    })

    const paymentFormData = JSON.parse(paymentStepData?.formdata)

    const urgencyFee = getFieldValue(paymentFormData, 'urgentFee')

    const requerente = paymentFormData.find(
      (item: { field: string }) => item.field === 'requerente',
    )?.value

    if (requerente?.name === 'Outro') {
      cvtNomeField = getFieldValue(paymentFormData, 'cvtNome')
      cvtMorada = getFieldValue(paymentFormData, 'cvtMorada')
      cvtCodPostal = getFieldValue(paymentFormData, 'cvtCodPostal')
      cvtLocalidade = getFieldValue(paymentFormData, 'cvtLocalidade')
      cvtNIF = getFieldValue(paymentFormData, 'cvtNIF')
      cvtEstrangeira = getFieldValue(paymentFormData, 'cvtEstrangeira')
      cvtResidencia = getFieldValue(paymentFormData, 'cvtResidencia')
    }

    const identification =
      cvtResidencia !== 'PT'
        ? { cvtNome: cvtNomeField, cvtEstrangeira, cvtNIF }
        : {
            cvtNome: cvtNomeField,
            cvtMorada,
            cvtCodPostal,
            cvtLocalidade,
            cvtNIF,
          }

    const data = {
      urgencyFeeValue: urgencyFee ? '2.45' : '',
      identification: identification,
    }

    return data
  } catch (e) {
    console.error('Error fetching submission data:', e)
    throw new Error('Failed to fetch submission data')
  }
}

export const postPaymentMultibanco = async (request: PaymentRequest) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_PAYMENTS_URL}/wsMPGeracaoRefMB`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

export const postPaymentMbWay = async (request: PaymentRequest) => {
  const { cabecalho, argumentos } = request
  try {
    const data = {
      data: {
        mensagem: {
          codigo: 200,
          descricao: 'Pagamento criado com sucesso',
          idMensagemExterna: '',
        },
        dados: {
          montante: argumentos.montante,
          transaccaoId: `TX-${Math.floor(Math.random() * 1000000)}`,
          redirectUrl: 'https://www.mbway.pt/',
          sessionToken: '',
        },
      },
    }
    return data
  } catch (e) {
    console.log(e)
  }
}

export const postPaymentCreditCard = async (request: PaymentRequest) => {
  const { cabecalho, argumentos } = request
  try {
    const data = {
      data: {
        mensagem: {
          codigo: 200,
          descricao: 'Pagamento criado com sucesso',
          idMensagemExterna: '',
        },
        dados: {
          montante: argumentos.montante,
          transaccaoId: `TX-${Math.floor(Math.random() * 1000000)}`,
          redirectUrl: 'https://www.visa.pt/',
          sessionToken: '',
        },
      },
    }
    return data
  } catch (e) {
    console.log(e)
  }
}

export const checkPaymentStatus = async (request: PaymentStatusRequest) => {
  const { cabecalho, argumentos } = request
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PAYMENTS_URL}/wsMPPesquisaEstadoTransacoes`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(request),
      },
    )

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`)
    }

    const data = await response.json()
    /*
    const data = {
      data: {
        mensagem: {
          codigo: 1,
          descricao: '',
          idMensagemExterna: '',
        },
        dadosPesquisa: {
          transacao: {
            transacaoId: argumentos?.transacaoIds?.transacaoId,
            data: new Date().toISOString(),
            idEstado: '0',
            pagamentoId: '123456789',
          },
        },
      },
    }*/
    return data[0]
  } catch (e) {
    console.log(e)
  }
}
