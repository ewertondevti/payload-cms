'use client'

import { InputText } from '@ama-pt/agora-design-system'
import { ChangeEvent, ClipboardEvent, FC } from 'react'
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

export const ConsultFormCVC: FC<Props> = ({
  titlepage,
  subtitlepage,
  errors,
  register,
  setValue,
}) => {
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

  const onPaste = (evt: ClipboardEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const value = evt.clipboardData.getData('text')
    const arr = value
      .replace(/[a-zA-Z]+/g, '')
      .split('-')
      .filter(Boolean)

    const isValid = () => {
      const regex = /^\d{4}-\d{4}-\d{4}$/
      return regex.test(value)
    }

    if (arr.length === 3 && isValid()) {
      setValue('accessCode1', arr[0])
      setValue('accessCode2', arr[1])
      setValue('accessCode3', arr[2])
    } else {
      setValue('accessCode1', '')
      setValue('accessCode2', '')
      setValue('accessCode3', '')
    }
  }

  const onChange = (fieldname: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[a-zA-Z]+/g, '')
    setValue(fieldname, value)
  }

  const registerOptions: RegisterOptions<FieldValues> = {
    required: true,
    minLength: 4,
    maxLength: 4,
  }

  return (
    <div className="flex flex-col w-fit gap-64" data-testid="consult-preview">
      <Title
        label={titlepage}
        sublabel={subtitlepage}
        className="my-[0] text-[32px] leading-[48px]"
      />

      <Title label="Código de acesso" htmlTag="h2" />

      <form>
        <div className="flex flex-col gap-8">
          <h2 className="text-base font-semibold text-[#021C51]">Insira o código de acesso</h2>
          <div className="flex gap-32">
            <div className="w-full">
              <InputText
                placeholder="0000"
                {...register('accessCode1', registerOptions)}
                feedbackState="danger"
                feedbackText={getErrorMessage('accessCode1')}
                hasError={!!errors?.['accessCode1']}
                onChange={onChange('accessCode1')}
                onPaste={onPaste}
                maxLength={4}
              />
            </div>

            <div className="w-full">
              <InputText
                placeholder="0000"
                {...register('accessCode2', registerOptions)}
                feedbackState="danger"
                feedbackText={getErrorMessage('accessCode2')}
                hasError={!!errors?.['accessCode2']}
                onChange={onChange('accessCode2')}
                onPaste={onPaste}
                maxLength={4}
              />
            </div>

            <div className="w-full">
              <InputText
                placeholder="0000"
                {...register('accessCode3', registerOptions)}
                feedbackState="danger"
                feedbackText={getErrorMessage('accessCode3')}
                hasError={!!errors?.['accessCode3']}
                onChange={onChange('accessCode3')}
                onPaste={onPaste}
                maxLength={4}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
