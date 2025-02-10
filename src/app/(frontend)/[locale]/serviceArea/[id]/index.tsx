'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { StepperBlock } from '@/blocks/Stepper/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import {
  getUserServiceOrder,
  getServiceOrderById,
  getServiceStepsById,
  postNewServiceOrder,
  putOrderById,
  deleteOrderbId,
  getGetStepInfoServiceOrder,
  postCreateStepServiceOrder,
  postUpdateStepServiceOrder,
//   submitSteps,
  updateStepsByArgs,
  getStepsByArgs,
} from '@/app/(frontend)/api'
import { Button, InputText } from '@ama-pt/agora-design-system'
import { Data, TypedLocale } from 'payload'
import { redirect } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { buildInitialFormState } from '@/blocks/Form/buildInitialFormState'
// import { useSearchParams } from 'next/navigation'

type BlockTypeProps = {
  content: string
  form: string
}

const BlockType: BlockTypeProps = {
  content: 'content-service-steps',
  form: 'form-service-steps',
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
  const [blockType, setBlockType] = useState(false)
  const [steps, setSteps]: any = useState(undefined)
  const [stepIndex, setStepIndex] = useState(0)
  const [stepData, setStepData] = useState(undefined)
  const [stepStatus, setStepStatus] = useState({})
  const [serviceOrder, setServiceOrder]: any = useState({})
  const [isNew, setIsNew] = useState(true)
  const [previousStepId, setPreviousStepId] = useState(0)



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

  // const [formData, setFormData] = useState([])

  // useEffect(() => {
  //     // Example JSON data
  //     const jsonData = '{"submissionData":[{"field":"texto","value":"aaaaa"}]}';
  //     const parsedData = JSON.parse(jsonData);

  //     // Update form state with parsed data
  //     const updatedFormData = {};
  //     parsedData.submissionData.forEach(item => {
  //       updatedFormData[item.field] = item.value;
  //     });

  //     setFormData(updatedFormData);
  //   }, []);

  //   const router = useRouter()
  //   const searchParams = useSearchParams()
  const userId = 'user1'
  //   const serviceId = searchParams.get("id")
  type StepsProps = {
    id: number
    userId: string
    serviceId: string
    stepId: string
    statusText: string
    stepStatus: string //'default' | 'disabled' | 'current' | 'done' | 'draft' | 'error'
  }

//   const handleFillSavedFields = async (stepIndex: number) => {
//     const ids: any = await params

//     // TODO: experiencia retirar
//     return

//     let stepData: any = await getGetStepInfoServiceOrder({
//       userId,
//       serviceId: ids.id,
//       stepIndex,
//       orderId: serviceOrder?.id,
//     })

//     setStepData(stepData)

//     if (stepData) {
//       try {
//         const parsedFormData = JSON.parse(stepData.formdata)
//         steps.steps[stepIndex]?.form?.fields.forEach((field: any) => {
//           const campo = parsedFormData?.filter((f: any) => f.field === field.name)

//           if (campo?.length > 0) {
//             field.defaultValue = campo[0].value
//             field.value = campo[0].value
//           }
//           // blocos compostos
//         })
//         setSteps({ ...steps })
//       } catch (error) {
//         console.error('Erro ao parsear formdata:', error)
//       }
//     }
//   }

  const handleGetServiceContent = async () => {
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
      let resultado = postNewServiceOrder(newOrder)

      setServiceOrder(resultado)
    }
    const serviceSteps: any = await getServiceStepsById(ids?.id)
    setSteps(serviceSteps?.steps)
    setPreviousStepId(stepIndex)
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

    // console.log("nextStep", nextStep)

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

    if (argsSteps)
    {
      await updateStepsByArgs({ ...stepsToSubmit })
    }
    else
    {
      setPreviousStepId(stepIndex)
      const data = await postCreateStepServiceOrder(stepsToSubmit)
    }
    
    // await submitSteps(stepsToSubmit)

    // setStepIndex(0)

    redirect('/services/details/' + serviceOrder?.serviceId)
  }

//   const handleSubmitForm = () => {
//     const stepsToSubmit = {
//       userId: serviceOrder?.userId,
//       serviceId: serviceOrder?.serviceId,
//       step: `${stepIndex}`,
//       formData: 'string', //substituir pelo conteudo do formulário
//     }
//     submitSteps(stepsToSubmit)
//   }

  let richText
  if (steps?.steps[stepIndex]?.blockType == BlockType.content) {
    richText = { richText: { root: steps?.steps[stepIndex]?.content.root }, size: 'full' }
  }

  const onSubmitStep = useCallback(    
    async (data: Data) => {
   
        // console.log("onSubmitStep", stepIndex)
        // console.log("serviceOrder", serviceOrder)

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      let serviceId = serviceOrder.serviceId
      let stepData = await getGetStepInfoServiceOrder({
        userId,
        serviceId,
        stepIndex,
        orderId: serviceOrder?.id,
      })
    //   console.log(stepData)

      if (!stepData)
      {
        const newStepOrder = {
          userId: userId,
          orderId: serviceOrder?.id,
          serviceId: serviceId,
          stepText: 'string',
          step: stepIndex.toString(),
          formdata: JSON.stringify(dataToSend),
        }

        await postCreateStepServiceOrder(newStepOrder)

        // const stepsToSubmit = {
        //   userId: userId,
        //   serviceId: serviceOrder?.serviceId,
        //   step: `${stepIndex}`,
        //   orderId: serviceOrder?.id,
        //   formData: JSON.stringify(dataToSend), //substituir pelo conteudo do formulário
        // }

        // submitSteps(stepsToSubmit)
      }
      else
      {
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

      stepIndex !== steps.steps.length - 1 && changeToNextStep(stepIndex + 1)
    },
    [stepIndex, steps, serviceOrder, serviceOrder?.id, userId],
  )

  return (
    <>
      <div className="flex">
        <StepperBlock
          steps={steps}
          handleNextStep={(stepId: number) => changeToNextStep(stepId)}
          currentStep={stepIndex}
        />
        {steps && (
          <div>
            {steps.steps[stepIndex]?.blockType == BlockType.content ? (
              <ContentBlock blockType={'content'} columns={[richText]} />
            ) : (
                <div></div>
            )}
          </div>
        )}
    
        <FormBlock
            enableIntro={false}
            form={steps?.steps[stepIndex]?.form}
            // onSubmitOverride={onSubmitStep}
            onSubmitOverride={onSubmitStep}
            showSubmitButton={false}
            stepIndex={stepIndex}
            />
      </div>


      {steps && (
        <div className="flex my-16">
          <div
            className="flex mt-12"
            style={{ display: 'flex-around', justifyContent: 'center', width: '100%' }}
          >
            {stepIndex != 0 && (
              <>
                <Button
                  children={'Anterior'}
                  hasIcon={true}
                  onClick={() => changeToNextStep(stepIndex - 1)}
                  leadingIcon="agora-line-arrow-left-circle"
                  leadingIconHover="agora-solid-arrow-left-circle"
                />
                <Button
                  style={{ marginLeft: 20, marginRight: 20 }}
                  children={'Guardar e Sair'}
                  appearance="outline"
                  hasIcon={false}
                  onClick={() => handleSaveAndExit()}
                />

                {steps.steps[stepIndex]?.blockType == BlockType.content ? (
                  <Button
                    children={'Cancelar'}
                    appearance="outline"
                    variant="danger"
                    hasIcon={false}
                    //   onClick={() => {
                    //     handleCancelOrder()
                    //   }}
                  />
                ) : (
                  <Button
                    children={'Cancelar'}
                    appearance="outline"
                    variant="danger"
                    hasIcon={false}
                    form={steps.steps[stepIndex]?.form?.id}
                    type="reset"
                    //   onClick={() => {
                    //     handleCancelOrder()
                    //   }}
                  />
                )}
              </>
            )}
          </div>

          <div className="flex mt-12 " style={{ justifyContent: 'flex-end', paddingRight: 50 }}>
            {/* No caso de já estar steps com informação, será continuar em vez de começar */}

            {steps.steps[stepIndex]?.blockType == BlockType.content ? (
              <Button
                //    form={steps.steps[stepIndex]?.form?.id}
                //    type="submit"
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
                //   onSubmit={() => {
                //     onSubmitStep
                //   }}
                onClick={() => {
                  stepIndex !== steps.steps.length - 1 && changeToNextStep(stepIndex + 1)

                  if (stepIndex >= steps.steps.length - 1) {
                    redirect('/services/details/' + serviceOrder?.serviceId)
                  }
                }}
                leadingIcon="agora-line-arrow-right-circle"
                leadingIconHover="agora-solid-arrow-right-circle"
              />
            ) : (
              <Button
                form={steps.steps[stepIndex]?.form?.id}
                // form="F1"
                type="submit"
                children={
                  stepIndex == 0
                    ? steps && stepData
                      ? 'Continuar'
                      : 'Começar'
                    : stepIndex == steps.steps.length - 1
                      ? 'Submeter'
                      : 'Seguinte'
                }
                hasIcon={true}
                //   onSubmit={() => {
                //     onSubmitStep
                //   }}
                //   onClick={() => {
                //         onSubmitStep
                //         stepIndex !== steps.steps.length - 1 && changeToNextStep(stepIndex + 1)
                //         }
                //     }
                leadingIcon="agora-line-arrow-right-circle"
                leadingIconHover="agora-solid-arrow-right-circle"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
