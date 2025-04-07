import { InputTextArea } from '@ama-pt/agora-design-system'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Width } from '../Width'

export type TextAreaProps = {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  width: number
  pattern?: RegExp
  errorMessage?: string
  minLength?: number
  maxLength?: number
  rows?: number
  defaultValue?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  defaultValue,
  required,
  rows = 3,
  width,
  minLength,
  maxLength,
  pattern,
  ...props
}) => {
  const { register, formState } = useFormContext()
  return (
    <Width width={width}>
      <InputTextArea
        {...props}
        id={name}
        rows={rows}
        required={required}
        hasFeedback={true}
        feedbackState="danger"
        feedbackText={formState.errors[name]?.message?.toString()}
        hasError={formState.errors[name] ? true : false}
        {...register(name, {
          required: required ? 'Campo de preenchimento obrigatório.' : false,
          minLength,
          maxLength,
          pattern,
        })}
      />
    </Width>
  )
}
