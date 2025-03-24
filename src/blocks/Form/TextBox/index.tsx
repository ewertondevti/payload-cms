import { useFormContext } from 'react-hook-form'

import React from 'react'

import { InputText } from '@ama-pt/agora-design-system'
import { Width } from '../Width'

export type TextBoxProps = {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  width: number
  pattern?: RegExp
  errorMessage?: string
  minLength?: number
  maxLength?: number
  defaultValue?: string
}

export const TextBox: React.FC<TextBoxProps> = ({
  width,
  required,
  pattern,
  errorMessage,
  minLength,
  maxLength,
  ...props
}) => {
  const { register, formState } = useFormContext()
  return (
    <Width width={width}>
      <InputText
        {...props}
        {...register(props.name!, { required, minLength, maxLength, pattern })}
        pattern={pattern?.toString()}
        {...{ minLength, maxLength }}
        feedbackState="danger"
        feedbackText={errorMessage || `Obrigatório preencher "${props.label}"`}
        hasError={!!formState.errors[props.name!]}
      />
    </Width>
  )
}
