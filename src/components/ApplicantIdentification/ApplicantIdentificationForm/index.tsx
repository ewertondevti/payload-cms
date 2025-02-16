'use client'

import { fields } from '@/blocks/Form/fields'
import { StepperBlock } from '@/blocks/Stepper/Component'
import { Form as FormType } from '@/payload-types'
import { Button } from '@ama-pt/agora-design-system'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  form: FormType
}

const IdentificationForm: FC<Props> = ({ form }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formValues, setFormValues] = useState<any>()
  const formMethods = useForm()

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = formMethods

  const onSubmit = () => {
    try {
      const values = getValues()
      const formattedValues = JSON.stringify(values, null, 2)
      setFormValues(formattedValues)
    } catch (error) {
      console.error(error)
    }
  }

  const titleClasses = classNames(
    'text-xl md:text-[2rem]',
    'leading-[1.5rem] md:leading-[3rem]',
    'font-bold text-[var(--color-primary-900)]',
    'px-4 md:px-0'
  )

  return (
    <div className="mt-8 md:mt-[64px] mb-8 md:mb-16">
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] px-4 md:px-0">
          <div className="flex flex-col md:flex-row gap-4 md:gap-[136px]">
            <div className="hidden md:block">
              <StepperBlock
                handleNextStep={(curr: number) => setCurrentStep(curr)}
                currentStep={currentStep}
                steps={{
                  steps: [
                    { id: 0, title: 'Início' },
                    { id: 1, title: 'Identificação' },
                    { id: 2, title: 'Certidão de Nascimento' },
                    { id: 3, title: 'Resumo' },
                    { id: 4, title: 'Pagamento' },
                    { id: 5, title: 'Submissão' },
                  ],
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-6 md:gap-[64px]">
                <section className="hero-section flex flex-col gap-2 md:gap-[8px]">
                  <h1 id="title" className={` text-center md:text-left ${titleClasses}`}>
                    {form.title}
                  </h1>
                  <h3 className="px-4 md:px-0 text-center md:text-left">
                    Preencha os dados de identificação do requerente.
                  </h3>
                </section>

                <section className="hero-section mb-5">
                  <form
                    id={String(form.id)}
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-wrap gap-4 md:gap-[32px] w-full"
                    noValidate
                  >
                    {form.fields?.map((field) => {
                      const Field: FC<any> = fields[field.blockType]
                      if (Field) {
                        return (
                          <Field
                            key={field.id}
                            form={form}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        )
                      } else {
                        console.warn("Bloco não encontrado no fields")
                        return null
                      }
                    }).filter(Boolean)}

                    <div className="flex flex-col md:flex-row justify-between w-full gap-4 mt-5">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
                        <Button variant="danger" appearance="outline" className="w-full md:w-auto">
                          Cancelar
                        </Button>
                        <Button type="button" appearance="outline" className="w-full md:w-auto">
                          Guardar e Sair
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 text-white flex justify-center items-center gap-2"
                      >
                        {form.submitButtonLabel}
                      </Button>
                    </div>
                  </form>

                  {!!formValues && (
                    <div className="p-4 md:p-16 bg-neutral-600 mt-4">
                      <pre className="text-xs md:text-base">{formValues}</pre>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default IdentificationForm