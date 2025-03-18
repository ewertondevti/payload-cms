import { useFormContext, type FieldErrorsImpl } from 'react-hook-form'

import { Checkbox as CheckboxUi, CheckboxProps } from '@ama-pt/agora-design-system'

import React from 'react'

import { Width } from '../Width'

export const Checkbox: React.FC<
  { name: string } & CheckboxProps & {
      errors: Partial<
        FieldErrorsImpl<{
          [x: string]: any
        }>
      >
    }
> = ({ name, errors, width, required, ...rest }) => {
  const { register } = useFormContext()
  return (
    <Width width={width}>
      <CheckboxUi
        {...rest}
        id={name}
        {...register(name, {
          required: required ? 'Campo de preenchimento obrigatório.' : false,
        })}
        required={required}
        hasError={errors[name] ? true : false}
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name]?.message?.toString()}
      />
    </Width>
  )
}
