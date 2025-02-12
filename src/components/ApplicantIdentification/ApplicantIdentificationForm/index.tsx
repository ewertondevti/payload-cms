'use client';

import { fields } from '@/blocks/Form/fields';
import { StepperBlock } from '@/blocks/Stepper/Component';
import { Form as FormType } from '@/payload-types';
import { Button } from '@ama-pt/agora-design-system';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  form: FormType
};

export const ApplicantIdentificationForm: FC<Props> = ({ form }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<string>();

  const formMethods = useForm();

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = formMethods;

  const onSubmit = () => {
    try {
      const values = getValues();
      const formattedValues = JSON.stringify(values, null, 2);
      setFormValues(formattedValues);
    } catch (error) {
      console.error(error);
    }
  };

  const titleClasses = classNames(
    'title text-2xl md:text-3xl font-bold',
    'text-[var(--color-primary-900)]',
  );

  // 1) Achar o índice a partir do qual você quer exibir "Dados da morada"
  //    Exemplo: separar no primeiro campo com label "País de residência"
  const addressStartIndex = form.fields?.findIndex(
    (field) => 'label' in field && field.label === 'País de residência'
  ) ?? -1;

  // 2) Separar em dois blocos:
  //    - identificationFields => tudo antes de 'País de residência'
  //    - addressFields        => a partir de 'País de residência'
  let identificationFields = form.fields || [];
  let addressFields: typeof form.fields = [];

  // Caso encontre o índice, faz o split
  if (addressStartIndex !== -1) {
    identificationFields = form.fields?.slice(0, addressStartIndex) || [];
    addressFields = form.fields?.slice(addressStartIndex) || [];
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8">
      <div className="w-full max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-center gap-8">
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

          <div className="flex flex-col gap-8 w-full max-w-[800px]">
            <section className="text-center md:text-left">
              <h1 id="title" className={titleClasses}>
                {form.title}
              </h1>
              <h3 className="text-[var(--color-primary-900)]">
                Preencha os dados relativos ao pedido que pretende efetuar.
              </h3>
            </section>

            {/* 1ª seção - Identificação */}
            <section className="mb-6">
              <form
                id={String(form.id)}
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-4 md:gap-8 w-full"
              >
                {/* Renderiza "identificationFields" primeiro */}
                {identificationFields.map((field) => {
                  const FieldComponent = fields[field.blockType];
                  if (!FieldComponent) return null;

                  return (
                    <FieldComponent
                      key={field.id}
                      form={form}
                      {...field}
                      {...formMethods}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  );
                })}


                <div className="flex justify-end w-full mt-4">
                  <Button type="submit">
                    {form.submitButtonLabel || 'Enviar'}
                  </Button>
                </div>
              </form>
            </section>

            {/* Exibe valores do form em JSON, se existirem */}
            {formValues && (
              <div className="p-4 md:p-8 bg-neutral-600 rounded-lg overflow-auto">
                <pre className="text-sm md:text-base text-white">
                  {formValues}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
