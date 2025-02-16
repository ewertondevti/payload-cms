import { InputTextArea } from '@ama-pt/agora-design-system'
import type { TextField } from '@payloadcms/plugin-form-builder/types'
import React from 'react'
import type { FieldErrorsImpl, UseFormReturn } from 'react-hook-form'

import { Width } from '../Width'

export const Textarea: React.FC<
  TextField &
    UseFormReturn & {
      errors: Partial<
        FieldErrorsImpl<{
          [x: string]: any
        }>
      >
      rows?: number
    }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
  ...props
}) => {
  return (
    <Width width={width}>
      <InputTextArea
        {...props}
        id={name}
        defaultValue={defaultValue ?? ''}
        label={label}
        rows={rows}
        required={requiredFromProps}
        hasFeedback={true}
        feedbackState="danger"
        feedbackText={errors[name]?.message?.toString()}
        hasError={errors[name] ? true : false}
        {...register(name, {
          required: requiredFromProps ? 'Campo de preenchimento obrigatório.' : false,
        })}
      />
    </Width>
  )
}
