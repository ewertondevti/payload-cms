'use client'

import { InputText } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { FieldErrors, FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { Title } from '../Form/Title'

export type ConsultFormCVCValues = {
  accessCode1: string
  accessCode2: string
  accessCode3: string
}

type Props = UseFormReturn & {
  titlepage: string
  subtitlepage: string
  errors: FieldErrors<FieldValues>
}

export const ConsultFormCVC: FC<Props> = ({ titlepage, subtitlepage, errors, register }) => {
  const getErrorMessage = (fieldname: string) => {
    switch (errors?.[fieldname]?.type) {
      case 'required':
        return 'Obrigatório preencher este campo.'

      case 'minLength':
        return 'Limite mínimo de dígitos é 4'

      case 'maxLength':
        return 'Limite máximo de dígitos é 4'

      default:
        return ''
    }
  }

  const registerOptions: RegisterOptions<FieldValues> = {
    required: true,
    minLength: 4,
    maxLength: 4,
  }

  return (
    <div className="flex flex-col w-fit gap-16" data-testid="consult-preview">
      <Title
        label={titlepage}
        sublabel={subtitlepage}
        className="my-[0] text-[32px] leading-[48px]"
      />

      <Title label="Código de acesso" htmlTag="h2" />

      <form>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-[#021C51]">Insira o código de acesso</h2>
          <div className="flex flex-col gap-8">
            <div className="flex gap-6">
              <div className="w-full">
                <InputText
                  placeholder="0000"
                  {...register('accessCode1', registerOptions)}
                  feedbackState="danger"
                  feedbackText={getErrorMessage('accessCode1')}
                  hasError={!!errors?.['accessCode1']}
                />
              </div>

              <div className="w-full">
                <InputText
                  placeholder="0000"
                  {...register('accessCode2', registerOptions)}
                  feedbackState="danger"
                  feedbackText={getErrorMessage('accessCode2')}
                  hasError={!!errors?.['accessCode2']}
                />
              </div>

              <div className="w-full">
                <InputText
                  placeholder="0000"
                  {...register('accessCode3', registerOptions)}
                  feedbackState="danger"
                  feedbackText={getErrorMessage('accessCode3')}
                  hasError={!!errors?.['accessCode3']}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
