'use client'

import { fields } from '@/blocks/Form/fields'
import { StepperBlock } from '@/blocks/Stepper/Component'
import { Form as FormType } from '@/payload-types'
import { Button, Icon } from '@ama-pt/agora-design-system'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import NoAuthWarning from '@/components/ApplicantIdentification/NoAuthWarning'

type Props = {
 form: FormType
}

export const NoAuthForm: FC<Props> = ({ form }) => {
 const [currentStep, setCurrentStep] = useState<number>(1)
 const [formValues, setFormValues] = useState<string>()
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
  <div className="mt-8 md:mt-[64px] mb-8 md:mb-16 px-4 md:px-0">
   <div className="flex justify-center">
    <div className="w-full max-w-[1200px]">
     <div className="flex flex-col md:flex-row gap-4 md:gap-[136px]">
      <div className="hidden md:block">
       <StepperBlock handleNextStep={(curr: number) => setCurrentStep(curr)}
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
        <section className="hero-section  mt-6 flex flex-col gap-2 md:gap-[8px]">
         <h1 id="title" className={titleClasses}>
          {form.title}
         </h1>
         <h3 className="text-[var(--color-primary-900)] mt-5 px-4 md:px-0 text-center md:text-left">
          Preencha os dados de identificação do requerente.
         </h3>
        </section>

        <div>
         <NoAuthWarning />
        </div>

        <section className="hero-section">
         <form id={String(form.id)} key="form" onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 md:gap-[32px] w-full" noValidate>
          {form.fields?.map((field) => {
           const Field: FC<any> = fields[field.blockType];

           if (Field) {
            const safeField = {
             ...field,
             placeholder: 'placeholder' in field ? field.placeholder ?? "Preencha este campo" : undefined,
             required: 'required' in field ? field.required ?? false : false,
            };

            return (
             <Field
              key={field.id}
              form={form}
              {...safeField}
              {...formMethods}
              control={control}
              errors={errors}
              register={register}
             />
            );
           } else {
            console.warn("Bloco não encontrado no fields:", field.blockType);
            return null;
           }
          })}


          <div className="flex flex-col md:flex-row justify-between w-full gap-4">
           <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
            <Button variant="danger" appearance="outline" className="w-full md:w-auto">
             Cancelar
            </Button>
           </div>
           <div>
            <Button type="submit" className="w-full md:w-auto bg-blue-600 text-white">
             {form.submitButtonLabel}
             <Icon name="agora-line-arrow-right-circle" className="fill-yellow-900" />
            </Button>
           </div>
          </div>

         </form>
         {!!formValues && (
          <div className="p-4 md:p-16 bg-neutral-600 mt-4">
           <pre className="text-xs md:text-base overflow-auto">{formValues}</pre>
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