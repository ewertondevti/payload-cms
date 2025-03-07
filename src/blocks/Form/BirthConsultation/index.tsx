'use client'

import { InputText } from '@ama-pt/agora-design-system'
import React from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import FormTitle from '../formTitle'

type AccessVerificationProps = {
  title: string
  subtitle?: string
  accessCodeTitle: string
  accessCode: {
    placeholder: string
    required: boolean
    label: string
  }
  errors: FieldErrors<FieldValues>
} & UseFormReturn<FieldValues>

export const BirthConsultation: React.FC<AccessVerificationProps> = ({
  title,
  subtitle,
  accessCodeTitle,
  accessCode,
  register,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <FormTitle title={title} subtitle={subtitle} />

      <div className="mb-4">
        <h5 className="text-xl font-bold text-[#021C51] mt-12">{accessCodeTitle}</h5>
      </div>

      <div className="mt-8">
        <h2 className="text-base font-semibold text-gray-900 mt-12">{accessCode.label}</h2>
        <div className="grid grid-cols-3 gap-6 mt-4 ">
          <InputText
            id="accessCode1"
            placeholder={accessCode.placeholder}
            {...register('accessCode1', { required: true })}
            feedbackState="danger"
            feedbackText={`Obrigatório preencher "${accessCode.label}"`}
            hasError={!!errors['accessCode1']}
          />
          <InputText
            id="accessCode2"
            placeholder={accessCode.placeholder}
            {...register('accessCode2', { required: true })}
            feedbackState="danger"
            feedbackText={`Obrigatório preencher "${accessCode.label}"`}
            hasError={!!errors['accessCode2']}
          />
          <InputText
            id="accessCode3"
            placeholder={accessCode.placeholder}
            {...register('accessCode3', { required: true })}
            feedbackState="danger"
            feedbackText={`Obrigatório preencher "${accessCode.label}"`}
            hasError={!!errors['accessCode3']}
          />
        </div>
      </div>
    </div>
  )
}
