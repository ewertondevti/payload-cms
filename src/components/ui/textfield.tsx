import React from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'
import { InputText } from '@ama-pt/agora-design-system'

export interface TextFieldProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  icon?: string
  hasFeedback?: boolean
  feedbackText?: string
  feedbackState?: 'info' | 'danger' | 'success' | 'warning'
  hasError?: boolean
  hideLabel?: boolean
  disabled?: boolean
  readOnly?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  required?: boolean
  id: string
  hasIcon?: boolean
  validation?: any
  className?: string
}

export const TextField: React.FC<TextFieldProps & { register: UseFormRegister<FieldValues> }> = ({
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
  className,
  id,
  hasFeedback,
  feedbackText,
  feedbackState,
  hasIcon,
  validation,
  hasError,
  register,
}) => {
  return (
    <InputText
      id={id}
      defaultValue={defaultValue}
      label={label}
      placeholder={placeholder}
      icon={icon}
      hasFeedback={hasFeedback}
      feedbackState={feedbackState}
      feedbackText={feedbackText}
      hideLabel={hideLabel}
      hasIcon={hasIcon}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      pattern={pattern}
      hasError={hasError}
      {...register(id, {
        required: required ? 'Campo de preenchimento obrigatório.' : false,
        ...validation,
      })}
    />
  )
}
