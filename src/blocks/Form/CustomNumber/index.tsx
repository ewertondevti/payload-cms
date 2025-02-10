import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { InputNumber } from '@ama-pt/agora-design-system'
import React from 'react'

import { Width } from '../Width'

export interface CustomNumberProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  min?: number
  max?: number
  required?: boolean
  width?: number
  name: string
}
export const CustomNumber: React.FC<
  CustomNumberProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({
  name,
  placeholder,
  disabled,
  readOnly,
  defaultValue,
  min,
  max,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  function isInRange(number: number) {
    const minValue = min ?? Number.MIN_SAFE_INTEGER
    const maxValue = max ?? Number.MAX_SAFE_INTEGER
    return number >= minValue && number <= maxValue
  }

  function getErrorMessage() {
    if (min !== null && max !== null) {
      return `O valor deve estar entre ${min} e ${max}.`
    }
    if (min !== null) {
      return `O valor deve ser maior que ${min}.`
    }
    if (max !== null) {
      return `O valor deve ser menor que ${max}.`
    }
    return 'Valor inválido.'
  }

  return (
    <Width width={width}>
      <InputNumber
        label={label}
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        hasError={errors[name] ? true : false}
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name]?.message?.toString()}
        required={requiredFromProps}
        {...register(name, {
          validate: (value) => {
            const numberValue = Number(value)
            if (!isInRange(numberValue)) {
              return getErrorMessage()
            }
            return true
          },
          required: requiredFromProps ? 'Campo de preenchimento obrigatório.' : false,
        })}
      />
    </Width>
  )
}
