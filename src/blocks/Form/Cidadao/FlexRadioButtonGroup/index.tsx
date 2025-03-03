import { RadioButton, RadioButtonGroup } from '@ama-pt/agora-design-system'
import { FC, useEffect, useState } from 'react'
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Width } from '../../Width'
import { AlignmentDirection } from './FlexRadioButtonGroupBlock'

export interface FlexRadioButtonGroupProps {
  label: string
  name: string
  alignment: AlignmentDirection
  options: {
    label: string
    value: string
  }[]
  defaultValue?: string
  required?: boolean
  width?: number
  errors?: FieldErrors<FieldValues>
}

export const FlexRadioButtonGroup: FC<
  FlexRadioButtonGroupProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ label, name, alignment, options, required, width, errors, register, defaultValue, setValue, ...props }) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  return (
      <RadioButtonGroup
        {...props}
        {...register(name, { required })}
        legend={label}
        id={name}
        feedbackState="danger"
        feedbackText={`Obrigatório preencher "${label}"`}
        hasError={!!errors[name]}
      >
        <div className={`w-full flex flex-wrap gap-12 ${alignment === 'vertical' ? 'flex-col' : ''}`}>
          {options.map((option) => (
            <RadioButton
              label={option.label}
              value={option.value}
              key={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => {
                setSelectedValue(e.target.value)
                setValue(name, e.target.value)
              }}
            />
          ))}
        </div>
      </RadioButtonGroup>
  )
}
