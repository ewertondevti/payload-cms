import React from 'react'
import { Width } from '../Width'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { TextField } from '@/components/ui/textfield'

export interface CustomTextFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  icon?: string
  feedbackText?: string
  hideLabel?: boolean
  disabled?: boolean
  readOnly?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  required?: boolean
  width?: number
  name: string
  errorMessage?: string
}

export const CustomTextField: React.FC<
  CustomTextFieldProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({
  defaultValue,
  label,
  placeholder,
  icon,
  hideLabel,
  disabled,
  readOnly,
  minLength,
  maxLength,
  pattern,
  required,
  name,
  width,
  errors,
  errorMessage,
  register,
}) => {
  return (
    <Width width={width}>
      <TextField
        id={name}
        defaultValue={defaultValue}
        label={label}
        placeholder={placeholder}
        icon={icon}
        hasError={errors[name] ? true : false}
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name]?.message?.toString()}
        hideLabel={hideLabel}
        hasIcon={icon ? true : false}
        disabled={disabled}
        readOnly={readOnly}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        register={register}
        validation={{
          pattern: pattern
            ? { value: new RegExp(pattern), message: errorMessage || '' }
            : undefined,
        }}
      />
    </Width>
  )
}
