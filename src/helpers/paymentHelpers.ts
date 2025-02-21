import {
  postPaymentMultibanco,
  postPaymentCreditCard,
  postPaymentMbWay,
  checkPaymentStatus,
} from '@/app/(frontend)/api/payments'

const postPayment = async (paymentMethod: string, request: any) => {
  switch (paymentMethod) {
    case 'Multibanco':
      return await postPaymentMultibanco(request)
    case 'Visa / Mastercard':
      return await postPaymentCreditCard(request)
    case 'MBWay':
      return await postPaymentMbWay(request)
    default:
      throw new Error('Método de pagamento não suportado')
  }
}

export const handlePaymentSubmit = async (
  paymentMethod: string,
  setShowLoading: (loading: boolean) => void,
  setData: (data: any) => void,
  setPaymentStatus: (status: string) => void,
  stepIndex: number,
  steps: any,
  changeToNextStep: (nextStep: number) => void,
  showCustomToast,
) => {
  setShowLoading(true)

  try {
    const request = {
      cabecalho: {
        nome_do_servico: paymentMethod,
        id_utilizador: '123',
        comunicacao: {
          idMensagemExterna: '123',
        },
      },
      argumentos: {
        pagamentoId: (Math.random() * 100000000).toString().slice(0, 5),
        pagamentoDesc: 'Teste',
        montante: '20',
      },
    }

    const response = await postPayment(paymentMethod, request)

    if (response?.data?.mensagem) {
      setData(response.data)
      //stepIndex !== steps.steps.length - 1 && changeToNextStep(stepIndex + 1)

      if (paymentMethod === 'Multibanco') {
        const statusResponse = await checkPaymentStatus({
          cabecalho: {
            nome_do_servico: paymentMethod,
            id_utilizador: '123',
            comunicacao: {
              idMensagemExterna: '123',
            },
          },
          argumentos: {
            transacaoIds: {
              transacaoId: [response.data.dadosPesquisa.transaccaoId],
            },
          },
        })

        if (
          ['0', '1', '2', '3', '4', '5'].includes(
            statusResponse.data.dadosPesquisa.transacao.idEstado,
          )
        ) {
          setPaymentStatus(statusResponse.data.dadosPesquisa.transacao.idEstado)
          stepIndex !== steps.steps.length - 1 && changeToNextStep(stepIndex + 1)
        }
      } else {
        if ('redirectUrl' in response.data.dados) {
          window.open(response.data.dados.redirectUrl, '_blank')
        }
      }
    } else {
      showCustomToast(
        {
          id: +new Date(),
          title: 'Erro ao processar pagamento',
          description:
            'Ocorreu um erro ao processar o pagamento. Por favor tente novamente ou escolha outro método de pagamento.',
          type: 'failure',
          closeLabel: 'Close toast',
        },
        5000,
      )
    }
  } catch (err) {
    console.log(err)
  } finally {
    setShowLoading(false)
  }
}
