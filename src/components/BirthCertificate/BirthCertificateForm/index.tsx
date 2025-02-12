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

export const BirthCertificateForm: FC<Props> = ({ form }) => {
  console.log(form)
  const [currentStep, setCurrentStep] = useState(2)
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
    'title text-[2rem] leading-[3rem] font-bold',
    'text-[var(--color-primary-900)]',
  )

  return (
    <div className="gap-x-[32px] gap-y-[64px]">
      <div>
        <div className="flex justify-center gap-[136px]">
          <StepperBlock
            handleNextStep={(curr: number) => setCurrentStep(curr)}
            currentStep={currentStep}
            steps={{
              steps: [
                {
                  id: 0,
                  title: 'Início',
                },
                {
                  id: 1,
                  title: 'Identificação',
                },
                {
                  id: 2,
                  title: 'Certidão de Nascimento',
                },
                {
                  id: 3,
                  title: 'Resumo',
                },
                {
                  id: 4,
                  title: 'Pagamento',
                },
                {
                  id: 5,
                  title: 'Submissão',
                },
              ],
            }}
          />
          <div className="flex flex-col gap-[32px]">
            <div className="container flex flex-col gap-[64px] align-center">
              <section className="hero-section flex flex-col gap-[8px]">
                <h1 id="title" className={titleClasses}>
                  {form.title}
                </h1>
                <h3 className="text-[var(--color-primary-900)]">
                  Preencha os dados relativos ao pedido que pretende efetuar.
                </h3>
              </section>

              <section className="hero-section">
                <form
                  id={String(form.id)}
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-wrap box-border gap-[32px] w-[800px]"
                  noValidate
                >
                  {form.fields?.map((field) => {
                    const Field: FC<any> = fields[field.blockType]

                    if (Field) {
                      return (
                        <Field
                          form={form}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          key={field.id}
                        />
                      )
                    }
                  })}

                  <div className="flex justify-end w-full">
                    <Button type="submit">{form.submitButtonLabel}</Button>
                  </div>
                </form>

                {!!formValues && (
                  <div className="p-16 bg-neutral-600">
                    <pre>{formValues}</pre>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
