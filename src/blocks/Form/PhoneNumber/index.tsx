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
          defaultISO="PT"
          {...register(name, { required: required ? 'Campo de preenchimento obrigatório.' : false })}
        />
      </Width>
    )
  }
