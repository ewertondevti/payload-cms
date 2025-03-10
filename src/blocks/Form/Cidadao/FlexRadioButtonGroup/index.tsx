import React from 'react'
import { RadioButton, RadioButtonGroup } from '@ama-pt/agora-design-system'
import { FC, useEffect, useState } from 'react'
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { AtomicField } from '../types'

export type AlignmentDirection = 'vertical' | 'horizontal'

export interface FlexRadioButtonGroupProps {
  label: string
  name: string
  alignment: AlignmentDirection
  options: AtomicField<string>[]
  defaultValue?: string
  required?: boolean
  width?: number
  errors?: FieldErrors<FieldValues>
  onChange?: (option: string) => void
  value?: string
}

export const FlexRadioButtonGroup: FC<FlexRadioButtonGroupProps & UseFormReturn> = ({
  label,
  name,
  alignment,
  options,
  required,
  errors,
  register,
  defaultValue,
  setValue,
  value,
  onChange,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue)

  useEffect(() => {
    if ((value !== undefined || defaultValue === undefined) && selectedValue !== value)
      setSelectedValue(value)
  }, [value])

  useEffect(() => {
    setValue(name, selectedValue)
    if (onChange && selectedValue !== undefined) onChange(selectedValue)
  }, [selectedValue])

  return (
    <RadioButtonGroup
      {...props}
      {...register(name, { required })}
      legend={label}
      id={name}
      feedbackState="danger"
      feedbackText={`Obrigatório preencher "${label}"`}
      hasError={!!errors?.[name]}
    >
      <div
        className={`w-full flex flex-wrap ${alignment === 'vertical' ? 'flex-col gap-4' : 'gap-32'}`}
      >
        {options.map((option) => (
          <RadioButton
            label={option.label}
            value={option.value}
            key={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => {
              setSelectedValue(e.target.value)
            }}
          />
        ))}
      </div>
    </RadioButtonGroup>
  )
}
