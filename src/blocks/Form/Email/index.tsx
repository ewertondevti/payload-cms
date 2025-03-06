import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { InputText } from '@ama-pt/agora-design-system'
import React from 'react'

import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
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
      <InputText
        defaultValue={defaultValue}
        id={name}
        label={label}
        required={requiredFromProps}
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name]?.message?.toString()}
        hasError={!!errors[name]}
        placeholder="Indique seu email"
        {...register(name, {
          required: requiredFromProps ? 'Campo de preenchimento obrigatório.' : false,
          pattern: {
            value: /^\S[^\s@]*@\S+$/,
            message: 'Email inválido',
          },
        })}
      />
    </Width>
  )
}
