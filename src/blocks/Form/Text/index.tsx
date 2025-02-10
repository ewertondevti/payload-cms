import type { TextField } from '@payloadcms/plugin-form-builder/types'
import { UseFormReturn, type FieldErrorsImpl } from 'react-hook-form'

import React from 'react'

import { InputText } from '@ama-pt/agora-design-system'
import { Width } from '../Width'

export const Text: React.FC<
  TextField &
    UseFormReturn & {
      pattern?: string
      errorMessage?: string
      errors: Partial<
        FieldErrorsImpl<{
          [x: string]: any
        }>
      >
    }
> = ({ width, register, required, pattern, errorMessage, errors, ...props }) => {
  return (
    <Width width={width}>
      <InputText
        {...props}
        {...register(props.name, {
          required,
        })}
        feedbackState="danger"
        feedbackText={errorMessage || `Obrigatório preencher "${props.label}"`}
        hasError={!!errors[props.name]}
      />
    </Width>
  )
}
