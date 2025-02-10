// import type { NifBlock } from '@/blocks/Form/Nif/NifBlock'

export interface NifField {
  blockName?: string
  blockType: 'nif'
  defaultValue?: string
  label?: string
  name: string
  required?: boolean
  width?: number,
//   disabled: boolean
}

import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { InputText } from '@ama-pt/agora-design-system'

export const Nif: React.FC<
  NifField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width, 
    // disabled 
}) => {
  return (
    <Width width={width}>
      {/* <Label htmlFor={name}>{label}</Label> */}
      <InputText
        defaultValue={defaultValue}
        id={name}
        label={label}
        type="text"
        hasFeedback={true}
        maxLength={9}
        hasError={errors[name] ? true : false}
        feedbackText={errors[name]?.message?.toString()}
        required={requiredFromProps}
        // disabled={disabled}
        {...register(name, {
          // required: requiredFromProps,
          // pattern: { value: /^[0-9]{9}$/, message: 'NIF Inválido' },
          // validate: (value, formValues) => value === '1'
          required: requiredFromProps ? 'Campo de preenchimento obrigatório.' : false,
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
