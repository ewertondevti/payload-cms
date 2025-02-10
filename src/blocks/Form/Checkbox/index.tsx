import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, UseFormReturn } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@ama-pt/agora-design-system'

import React from 'react'

import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & UseFormReturn
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  setValue,
  required: requiredFromProps,
  width,
}) => {
  const props = register(name, {
    required: requiredFromProps ? 'Campo de preenchimento obrigatório.' : false,
  })

  return (
    <Width width={width}>
      <style>
        {`
          .agora-radio-button-feedback {
            padding-left: 8px;
          }
        `}
      </style>
      <CheckboxUi
        defaultChecked={defaultValue}
        label={label}
        id={name}
        {...props}
        onChange={(event) => {
          setValue(props.name, event.target.checked)
        }}
        required={requiredFromProps}
        hasError={errors[name] ? true : false}
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name]?.message?.toString()}
      />
    </Width>
  )
}
