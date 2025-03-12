import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'

export type NifProps = UseFormReturn & {
  errors: FieldErrors<FieldValues>
  label?: string
  placeholder?: string
  name: string
  required?: boolean
  width?: number
}

import React from 'react'

import { InputText } from '@ama-pt/agora-design-system'
import { Width } from '../Width'

export const Nif: React.FC<NifProps> = ({
  name,
  placeholder,
  errors,
  label,
  register,
  required,
  width,
  // disabled
}) => {
  return (
    <Width width={width}>
      <style>
        {`
          .input-label-wrapper {
            margin-bottom: 8px !important;
          }
        `}
      </style>

      {/* <Label htmlFor={name}>{label}</Label> */}
      <InputText
        placeholder={placeholder}
        id="cvtNIF"
        label={label}
        type="text"
        hasFeedback={true}
        maxLength={9}
        hasError={errors[name] ? true : false}
        feedbackText={errors[name]?.message?.toString()}
        required={required}
        // disabled={disabled}
        {...register(name, {
          // required: requiredFromProps,
          // pattern: { value: /^[0-9]{9}$/, message: 'NIF Inválido' },
          // validate: (value, formValues) => value === '1'
          required: required ? 'Campo de preenchimento obrigatório.' : false,
          validate: {
            isNif: (value) => {
              var valido = false
              var nif = value

              if (nif === '') {
                return true
              }

              if (!/^[0-9]{9}$/.test(nif)) {
                valido = false
              }

              // Converte o NIF para um array de números
              const nifArray = nif.split('').map(Number)

              // Calcula o dígito de controlo
              const checkDigit = nifArray[8]
              const sum = nifArray
                .slice(0, 8)
                .reduce((acc, num, index) => acc + num * (9 - index), 0)
              const calculatedCheckDigit = 11 - (sum % 11)

              // Verifica o dígito de controlo
              if (calculatedCheckDigit >= 10) {
                valido = checkDigit === 0
              } else {
                valido = checkDigit === calculatedCheckDigit
              }

              if (valido === false) {
                return 'NIF Inválido'
              }

              return true
            },
          },
        })}
      />
    </Width>
  )
}
