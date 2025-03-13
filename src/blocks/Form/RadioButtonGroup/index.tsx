import { RadioButton, RadioButtonGroup } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Width } from '../Width'

export interface RadioButtonsProps {
  label: string
  name: string
  options: {
    label: string
    value: string
  }[]
  defaultValue?: string
  required?: boolean
  width?: number
  errors?: FieldErrors<FieldValues>
}

export const RadioButtons: FC<
  RadioButtonsProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ label, name, options, required, width, errors, register, setValue, ...props }) => {
  return (
    <Width width={width ?? 50}>
      <RadioButtonGroup
        {...props}
        {...register(name, { required: false })}
        legend={label}
        id={name}
        feedbackState="danger"
        feedbackText={`Obrigatório preencher "${label}"`}
        hasError={!!errors[name]}
      >
        {options.map((option) => (
          <RadioButton label={option.label} value={option.value} key={option.value} />
        ))}
      </RadioButtonGroup>
    </Width>
  )
}
