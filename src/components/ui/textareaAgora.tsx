import React from 'react'
import { InputTextArea } from '@ama-pt/agora-design-system'

export interface TextAreaProps {
  defaultValue?: string
  label?: string
  placeholder?: string
  hasFeedback?: boolean
  feedbackText?: string
  feedbackState?: 'info' | 'danger' | 'success' | 'warning'
  hideLabel?: boolean
  showCharCounter?: boolean
  disabled?: boolean
  readOnly?: boolean
  minLength?: number
  maxLength?: number
  required?: boolean
  id: string
  rows?: number
}

export const TextAreaAgora: React.FC<TextAreaProps> = ({
  defaultValue,
  label,
  placeholder,
  hideLabel,
  showCharCounter,
  disabled,
  readOnly,
  minLength,
  maxLength,
  required,
  id,
  hasFeedback,
  feedbackText,
  feedbackState,
  rows = 3,
}) => {
  return (
    <InputTextArea
      id={id}
      defaultValue={defaultValue}
      label={label}
      placeholder={placeholder}
      hasFeedback={hasFeedback}
      feedbackState={feedbackState}
      feedbackText={feedbackText}
      hideLabel={hideLabel}
      showCharCounter={showCharCounter}
      disabled={disabled}
      readOnly={readOnly}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      rows={rows}
    />
  )
}
