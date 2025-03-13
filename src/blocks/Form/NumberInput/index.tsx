import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { InputNumber } from '@ama-pt/agora-design-system'
import React from 'react'

import { Width } from '../Width'
export const NumberInput: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <InputNumber
        label={label}
        defaultValue={defaultValue}
        id={name}
        hasError={errors[name] ? true : false}
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name]?.message?.toString()}
        {...register(name, {
          required: requiredFromProps ? 'Campo de preenchimento obrigatório.' : false,
        })}
      />
    </Width>
  )
}
