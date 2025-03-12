'use client'
import {
  getGetStepInfoServiceOrder,
  getServiceOrderById,
  getServiceStepsById,
  getStepsByArgs,
  getUserServiceOrder,
  postCreateStepServiceOrder,
  postNewServiceOrder,
  postUpdateStepServiceOrder,
  putOrderById,
  //   submitSteps,
  updateStepsByArgs,
} from '@/app/(frontend)/api'
import { ContentBlock } from '@/blocks/Content/Component'
import { buildInitialFormState } from '@/blocks/Form/buildInitialFormState'
import PaymentBlock from '@/blocks/Payment/Component'
import { StepperBlock } from '@/blocks/Stepper/Component'
import SubmissionBlock from '@/blocks/Submission/Component'
import SummaryBlock from '@/blocks/Summary/Component'
import { handlePaymentSubmit } from '@/helpers/paymentHelpers'
import { useToast } from '@/hooks/useToast'
import { Button, useLoaderDialogContext } from '@ama-pt/agora-design-system'
import { redirect } from 'next/navigation'
import { Data, TypedLocale } from 'payload'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import { useSearchParams } from 'next/navigation'

import { BirthConsultationForm } from '@/blocks/BirthConsultationForm'
import { ConsultPreview } from '@/blocks/ConsultPreviewServiceStep'
import { FormBlock } from '@/blocks/Form/Component'
import { GetCertidaoResponse } from '@/models/certificate'
import { Service } from '@/payload-types'
import { getCertidao } from '@/services/certificateServices'

type BlockTypeProps = {
  content: string
  form: string
  payment: string
  submission: string
  summary: string
  exemplo: string
  consultpreview: string
  birthbonsultationForm: string
}

const BlockType: BlockTypeProps = {
  content: 'content-service-steps',
  form: 'form-service-steps',
  payment: 'payment-service-steps',
  submission: 'submission-service-steps',
  summary: 'summary-service-steps',
  exemplo: 'exemplo1ServiceSteps',
  consultpreview: 'consult-preview',
  birthbonsultationForm: 'birthbonsultationForm',
}

type Args = {
  params: Promise<{
    id?: string
    title?: string
    slug?: string
    locale?: TypedLocale
  }>
}

export default function ServiceStep({ params }: Args) {
  const { showLoader, hideLoader } = useLoaderDialogContext()
  const [blockType, setBlockType] = useState(false)
  const [steps, setSteps]: any = useState(undefined)
  const [stepIndex, setStepIndex] = useState(0)
  const [stepData, setStepData] = useState(undefined)
  const [stepStatus, setStepStatus] = useState({})
  const [serviceOrder, setServiceOrder]: any = useState({})
  const [isNew, setIsNew] = useState(true)
  const [previousStepId, setPreviousStepId] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showLoading, setShowLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')
  const validateFields = useRef<(() => Promise<boolean>) | null>(null)
  const [service, setService] = useState<Service>()
  const { showCustomToast } = useToast()
  const [certidaoResponse, setCertidaoResponse] = useState<GetCertidaoResponse>()
  const [isConsultingFetching, setIsConsultingFetching] = useState(false)
  const [data, setData] = useState({
    mensagem: {
      codigo: 0,
      descricao: '',
      idMensagemExterna: '',
    },
    dadosPesquisa: {
      entidadeNumero: '',
      referencia: '',
      montante: '',
      transaccaoId: '',
      dataExpiracao: new Date(),
    },
  })

  const formMethods = useForm({
    defaultValues: buildInitialFormState(steps?.steps[stepIndex]?.form?.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  useEffect(() => {
    handleGetServiceContent()
  }, [])

  const userId = 'user1'

  type StepsProps = {
    id: number
    userId: string
    serviceId: string
    stepId: string
    statusText: string
    stepStatus: string //'default' | 'disabled' | 'current' | 'done' | 'draft' | 'error'
  }

  const handleGetServiceContent = async () => {
    setShowLoading(true)
    try {
      const ids: any = await params
      const user = 'user1'

      // Get services Orders
      const userServiceOrder = await getUserServiceOrder({ userId: user, serviceId: ids.id })

      // if exists gets the order and the service steps
      if (userServiceOrder) {
        //   const serviceOrders = await getServiceOrderById(+ids?.id) // modify the '1' to the correct param
        const serviceOrders = await getServiceOrderById(userServiceOrder.id)
        setServiceOrder(serviceOrders)
        setIsNew(false)
      } else {
        // if not
        const newOrder = {
          userId: user,
          serviceId: ids?.id,
          stepId: `${stepIndex}`,
          statusText: 'string',
          status: `O`,
          paymentText: 'string',
          payment: 'W',
        }
        setIsNew(true)
        let resultado = await postNewServiceOrder(newOrder)

        setServiceOrder(resultado)
      }

      const serviceSteps: Service = await getServiceStepsById(ids?.id)
      setService(serviceSteps)
      setSteps(serviceSteps?.steps)
      setPreviousStepId(stepIndex)
    } catch (error) {
      console.error('Error fetching service content:', error)
    } finally {
      setShowLoading(false)
    }
  }

  const changeToNextStep = (nextStep: any) => {
    setStepStatus(stepStatus)

    // console.log("changeToNextStep serviceOrder:", serviceOrder)

    // console.log("steps.steps[stepIndex]?.form?.fields: ", steps?.steps[stepIndex]?.form?.fields)

    const updateOrder = {
      id: serviceOrder?.id,
      userId: serviceOrder?.userId,
      serviceId: serviceOrder?.serviceId,
      //   stepId: `${stepIndex}`,
      stepId: `${nextStep}`,
      statusText: serviceOrder?.statusText,
      status: `O`, //`${stepStatus}`,
      paymentText: serviceOrder?.paymentText,
      payment: serviceOrder?.payment,
    }

    // console.log("updateOrder", updateOrder)

    putOrderById(updateOrder)

    // if (nextStep <= updateOrder?.stepId) {
    //   setStepIndex(stepIndex)
    // } else {
    // }

    // const indexBeforeChange = stepIndex

    setStepIndex(nextStep)
    // handleFillSavedFields(nextStep)

    // steps.steps[indexBeforeChange].form.fields = null
  }

  const handleCancelOrder = async () => {
    // deleteOrderbId(serviceOrder?.id)
    // setSteps(null)
    // setStepIndex(0)
    setStepIndex(stepIndex)
  }

  const handleSaveAndExit = async () => {
    await putOrderById(serviceOrder)
    const stepsToSubmit = {
      userId: serviceOrder?.userId,
      serviceId: serviceOrder?.serviceId,
      step: `${stepIndex}`,
      stepId: `${stepIndex}`,
      orderId: serviceOrder?.id,
      formData: JSON.stringify(steps.steps[stepIndex]?.form?.fields), //substituir pelo conteudo do formulário
    }

    const argsSteps = await getStepsByArgs(
      //   `${previousStepId}`,
      stepIndex.toString(),
      serviceOrder?.serviceId,
      serviceOrder?.userId,
      serviceOrder?.id,
    )

    if (argsSteps) {
      await updateStepsByArgs({ ...stepsToSubmit })
    } else {
      setPreviousStepId(stepIndex)
      const data = await postCreateStepServiceOrder(stepsToSubmit)
    }

    // await submitSteps(stepsToSubmit)

    // setStepIndex(0)

    redirect('/services/details/' + serviceOrder?.serviceId)
  }

  let richText
  if (steps?.steps[stepIndex]?.blockType == BlockType.content) {
    richText = { richText: { root: steps?.steps[stepIndex]?.content.root }, size: 'full' }
  }

  const onSubmitStep = useCallback(
    async (data: Data) => {
      setIsConsultingFetching(true)

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      let serviceId = serviceOrder?.serviceId
      let stepData = await getGetStepInfoServiceOrder({
        userId,
        serviceId,
        stepIndex,
        orderId: serviceOrder?.id,
      })

      if (!stepData) {
        const newStepOrder = {
          userId: userId,
          orderId: serviceOrder?.id,
          serviceId: serviceId,
          stepText: 'string',
          step: stepIndex.toString(),
          formdata: JSON.stringify(dataToSend),
        }

        await postCreateStepServiceOrder(newStepOrder)
      } else {
        const updatedStepOrder = {
          id: stepData.id,
          userId: userId,
          orderId: serviceOrder?.id,
          serviceId: serviceId,
          stepText: 'string',
          step: stepIndex.toString(),
          status: 'C',
          formdata: JSON.stringify(dataToSend),
        }

        postUpdateStepServiceOrder(updatedStepOrder)
      }

      await handleGetServiceContent()

      if (Object.keys(data).length) {
        const code = `${data.accessCode1}-${data.accessCode2}-${data.accessCode3}`

        const res = await getCertidao(code)

        setIsConsultingFetching(false)
        setCertidaoResponse(res)
      }

      if (stepIndex !== steps.steps.length - 1) {
        changeToNextStep(stepIndex + 1)
      }
    },
    [stepIndex, steps, serviceOrder, serviceOrder?.id, userId],
  )

  const StepRenderer = (blockType: string) => {
    switch (blockType) {
      case BlockType.content:
        return <ContentBlock blockType="content" columns={[richText]} />
      case BlockType.payment:
        return (
          <FormProvider {...formMethods}>
            <PaymentBlock
              setPaymentMethod={setPaymentMethod}
              validateFields={validateFields}
              userId={userId}
              serviceId={serviceOrder?.serviceId}
              orderId={serviceOrder?.id}
              services={[{ description: steps.steps[2]?.title, value: '10' }]}
            />
          </FormProvider>
        )
      case BlockType.submission:
        return (
          <SubmissionBlock
            data={data}
            paymentMethod={paymentMethod}
            paymentStatus={paymentStatus}
            services={[{ description: steps.steps[2]?.title, value: '10' }]}
            userId={userId}
            serviceId={serviceOrder?.serviceId}
            orderId={serviceOrder?.id}
            requestNumber="125 678 554"
          />
        )
      case BlockType.summary:
        return (
          <SummaryBlock
            services={steps.steps[2]?.title}
            userId={userId}
            serviceId={serviceOrder?.serviceId}
            orderId={serviceOrder?.id}
          />
        )
      case BlockType.consultpreview:
        return (
          <ConsultPreview
            {...steps.steps[stepIndex]}
            certidaoResponse={certidaoResponse}
            isLoading={isConsultingFetching}
          />
        )

      case BlockType.birthbonsultationForm:
        return (
          <BirthConsultationForm
            enableIntro={false}
            form={steps?.steps[stepIndex]?.form}
            onSubmitOverride={onSubmitStep}
            showSubmitButton={false}
            stepIndex={stepIndex}
          />
        )
      default:
        return (
          <FormBlock
            enableIntro={false}
            form={steps?.steps[stepIndex]?.form}
            onSubmitOverride={onSubmitStep}
            showSubmitButton={false}
            stepIndex={stepIndex}
          />
        )
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stepIndex])

  useEffect(() => {
    if (showLoading) {
      showLoader({})
    } else {
      hideLoader()
    }
  }, [showLoading])

  return (
    <>
      <div className="flex gap-x-[136px]">
        <StepperBlock
          steps={steps}
          handleNextStep={(stepId: number) => changeToNextStep(stepId)}
          currentStep={stepIndex}
        />

        {steps && (
          <div className="w-fit flex flex-col gap-16">
            {StepRenderer(steps.steps[stepIndex]?.blockType)}

            <div className="flex justify-between px-8">
              <div className="flex gap-8">
                {stepIndex !== 0 && steps.steps[stepIndex]?.blockType !== BlockType.submission && (
                  <>
                    <Button
                      children="Anterior"
                      hasIcon={true}
                      onClick={() => changeToNextStep(stepIndex - 1)}
                      leadingIcon="agora-line-arrow-left-circle"
                      leadingIconHover="agora-solid-arrow-left-circle"
                    />
                    <Button
                      children="Guardar e Sair"
                      appearance="outline"
                      hasIcon={false}
                      onClick={() => handleSaveAndExit()}
                    />
                    <Button
                      children="Cancelar"
                      appearance="outline"
                      variant="danger"
                      hasIcon={false}
                      form={
                        steps.steps[stepIndex]?.blockType === BlockType.content
                          ? undefined
                          : steps.steps[stepIndex]?.form?.id
                      }
                      type={
                        steps.steps[stepIndex]?.blockType === BlockType.content
                          ? undefined
                          : 'reset'
                      }
                    />
                  </>
                )}
              </div>

              <div className="flex justify-end">
                {/* No caso de já estar steps com informação, será continuar em vez de começar */}
                {steps.steps[stepIndex]?.blockType === BlockType.content ||
                steps.steps[stepIndex]?.blockType === BlockType.summary ? (
                  <Button
                    children={
                      stepIndex == 0
                        ? steps && !isNew
                          ? 'Continuar'
                          : 'Começar'
                        : stepIndex == steps.steps.length - 1
                          ? 'Submeter'
                          : 'Seguinte'
                    }
                    hasIcon={true}
                    onClick={() => {
                      stepIndex !== steps.steps.length - 1 && changeToNextStep(stepIndex + 1)

                      if (stepIndex >= steps.steps.length - 1) {
                        redirect('/services/details/' + serviceOrder?.serviceId)
                      }
                    }}
                    leadingIcon="agora-line-arrow-right-circle"
                    leadingIconHover="agora-solid-arrow-right-circle"
                  />
                ) : steps.steps[stepIndex]?.blockType === BlockType.submission ? (
                  <Button
                    children="Ir para Área Reservada"
                    hasIcon={true}
                    onClick={() => redirect('/AreaReservada')}
                    leadingIcon="agora-line-arrow-right-circle"
                    leadingIconHover="agora-solid-arrow-right-circle"
                  />
                ) : steps.steps[stepIndex]?.blockType === BlockType.payment ? (
                  <Button
                    form={steps.steps[stepIndex]?.form?.id}
                    children="Seguinte"
                    hasIcon={true}
                    type="submit"
                    onClick={async () => {
                      if (!paymentMethod.length) {
                        showCustomToast(
                          {
                            id: +new Date(),
                            title: 'Selecione um tipo de pagamento',
                            description:
                              'Para prosseguir é necessário selecionar um método de pagamento.',
                            type: 'failure',
                            closeLabel: 'Close toast',
                          },
                          5000,
                        )
                      } else {
                        handleSubmit((data) => {
                          onSubmitStep(data)
                          handlePaymentSubmit(
                            paymentMethod,
                            setShowLoading,
                            setData,
                            setPaymentStatus,
                            stepIndex,
                            steps,
                            changeToNextStep,
                            showCustomToast,
                          )
                        })()
                      }
                    }}
                    leadingIcon="agora-line-arrow-right-circle"
                    leadingIconHover="agora-solid-arrow-right-circle"
                  />
                ) : (
                  // ) : steps.steps[stepIndex]?.blockType === BlockType.exemplo ? (
                  //   <></>
                  <Button
                    form={steps.steps[stepIndex]?.form?.id}
                    type="submit"
                    children={stepIndex === steps.steps.length - 1 ? 'Submeter' : 'Seguinte'}
                    hasIcon={true}
                    leadingIcon="agora-line-arrow-right-circle"
                    leadingIconHover="agora-solid-arrow-right-circle"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
