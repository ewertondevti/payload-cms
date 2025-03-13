import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'

import React from 'react'

import { InputText } from '@ama-pt/agora-design-system'
import { Width } from '../Width'

export type TextBoxProps = UseFormReturn & {
  name: string
  label: string
  placeholder: string
  required?: boolean
  width: number
  pattern?: RegExp
  errorMessage?: string
  errors: FieldErrors<FieldValues>
  minLength?: number
  maxLength?: number
}

export const TextBox: React.FC<TextBoxProps> = ({
  width,
  register,
  required,
  pattern,
  errorMessage,
  errors,
  minLength,
  maxLength,
  ...props
}) => {
  return (
    <Width width={width}>
      

      <InputText
        {...props}
        {...register(props.name!, { required, minLength, maxLength, pattern })}
        pattern={pattern?.toString()}
        {...{ minLength, maxLength }}
        feedbackState="danger"
        feedbackText={errorMessage || `Obrigatório preencher "${props.label}"`}
        hasError={!!errors[props.name!]}
      />
    </Width>
  )
}
