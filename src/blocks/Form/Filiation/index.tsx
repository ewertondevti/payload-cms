import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { InputText } from '@ama-pt/agora-design-system'

export interface FiliationProps {
  name: string
  label: string
}

export const Filiation: React.FC<
  FiliationProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, label, errors, register }) => {
  return (
    <div className="flex flex-col gap-64">
      <h2 className="font-bold text-xl text-[#021C51]">{label}</h2>
      <InputText
        id={`${name}-cvtParent1`}
        label="Filho de..."
        placeholder="Indique o nome completo"
        hasError={errors.parent1 ? true : false}
        feedbackState={'danger'}
        feedbackText={errors.parent1?.message?.toString()}
        {...register(`${name}-cvtParent1`, {
          required: 'Campo de preenchimento obrigatório',
          pattern: {
            value: /[^\s]+\S+[^\s]+/,
            message: 'Nome inválido',
          },
          maxLength: 255,
        })}
      />
      <InputText
        id={`${name}-cvtParent2`}
        label="E de..."
        placeholder="Indique o nome completo"
        hasError={errors.parent2 ? true : false}
        feedbackState={'danger'}
        feedbackText={errors.parent2?.message?.toString()}
        {...register(`${name}-cvtParent2`, {
          required: 'Campo de preenchimento obrigatório',
          pattern: {
            value: /[^\s]+\S+[^\s]+/,
            message: 'Nome inválido',
          },
          maxLength: 255,
        })}
      />
    </div>
  )
}
