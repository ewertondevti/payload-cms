import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { InputPhone } from '@ama-pt/agora-design-system'
import { Width } from '../Width'

export interface PhoneNumberProps {
  label?: string
  name: string
  placeholder?: string
  readonly?: boolean
  required?: boolean
  searchable?: boolean
  searchInputPlaceholder?: string
  width?: number
}

export const PhoneNumber: React.FC<
  PhoneNumberProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({
  label,
  name,
  placeholder,
  readonly,
  required,
  searchable,
  searchInputPlaceholder,
  width,
  errors,
  register,
}) => {
    return (
      <Width width={width}>
        <InputPhone
          id={name}
          label={label}
          placeholder={placeholder}
          readOnly={readonly}
          required={required}
          searchable={searchable}
          searchInputPlaceholder={searchInputPlaceholder}
          searchNoResultsText="Não foram encontrados resultados."
          hasFeedback={true}
          hasError={errors[name] ? true : false}
          feedbackState={'danger'}
          feedbackText={errors[name]?.message?.toString()}
          maxLength={20}
          defaultISO="PT"
          {...register(name, {
            required: required ? 'Campo de preenchimento obrigatório.' : false,
            minLength: {
              value: 9,
              message: 'O número deve ter no mínimo 9 dígitos.'
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Apenas números são permitidos.'
            }
          })}
        />
      </Width>
    )
  }
