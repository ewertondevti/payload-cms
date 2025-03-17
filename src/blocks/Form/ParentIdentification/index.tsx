'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { InputText, InputDate } from '@ama-pt/agora-design-system'
import { Select } from '@/blocks/Form/Select'
import { Width } from '../Width'
import { DatePicker } from '@/blocks/Form/DatePicker'

interface FieldConfig {
  label: string
  placeholder: string
  required?: boolean
}

export interface ParentIdentificationProps {
  firstName: FieldConfig
  lastName: FieldConfig
  documentType: FieldConfig
  documentNumber: FieldConfig
  verificationDigit: FieldConfig
  gender: FieldConfig
  maritalStatus: FieldConfig
  birthDate: { label: string; required?: boolean }
  nationality: FieldConfig
}

const options = {
  identification: [
    { label: 'Cartão de Cidadão', value: 'cc' },
    { label: 'Passaporte', value: 'passport' },
    { label: 'Outro', value: 'other' },
  ],
  gender: [
    { label: 'Feminino', value: 'female' },
    { label: 'Masculino', value: 'male' },
    { label: 'Outro', value: 'other' },
  ],
  maritalStatus: [
    { label: 'Solteiro(a)', value: 'single' },
    { label: 'Casado(a)', value: 'married' },
    { label: 'Divorciado(a)', value: 'divorced' },
    { label: 'Viúvo(a)', value: 'widowed' },
  ],
  nationality: [
    { label: 'Portugal', value: 'PT' },
    { label: 'Brasil', value: 'BR' },
    { label: 'Outro', value: 'other' },
  ],
}

export const ParentIdentification = ({
  register,
  errors,
  firstName,
  lastName,
  documentType,
  documentNumber,
  verificationDigit,
  gender,
  maritalStatus,
  birthDate,
  nationality,
}: ParentIdentificationProps & {
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
}) => {
  const getError = (field: string) =>
    errors?.[field]?.type === 'required' ? 'Obrigatório preencher este campo.' : ''

  return (
    <div className="flex flex-col gap-32">
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <InputText
            label={firstName.label}
            placeholder={firstName.placeholder}
            required={firstName.required}
            hasError={!!errors?.firstName}
            feedbackText={getError('firstName')}
            feedbackState="danger"
            {...register('firstName', { required: firstName.required })}
          />
        </Width>
        <Width width={50}>
          <InputText
            label={lastName.label}
            placeholder={lastName.placeholder}
            required={lastName.required}
            hasError={!!errors?.lastName}
            feedbackText={getError('lastName')}
            feedbackState="danger"
            {...register('lastName', { required: lastName.required })}
          />
        </Width>
      </div>

      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <Select
            name="documentType"
            label={documentType.label}
            placeholder={documentType.placeholder}
            options={options.identification}
            hasError={!!errors?.documentType}
          />
        </Width>
        <Width width={50}>
          <input
            type="text"
            style={{ opacity: 0, pointerEvents: 'none', width: '100%', height: '40px' }}
            disabled
            aria-hidden="true"
          />
        </Width>

        <Width width={50}>
          <InputText
            label={documentNumber.label}
            placeholder={documentNumber.placeholder}
            required={documentNumber.required}
            hasError={!!errors?.documentNumber}
            feedbackText={getError('documentNumber')}
            feedbackState="danger"
            {...register('documentNumber', { required: documentNumber.required })}
          />
        </Width>
        <Width width={50}>
          <InputText
            label={verificationDigit.label}
            placeholder={verificationDigit.placeholder}
            required={verificationDigit.required}
            hasError={!!errors?.verificationDigit}
            feedbackText={getError('verificationDigit')}
            feedbackState="danger"
            {...register('verificationDigit', { required: verificationDigit.required })}
          />
        </Width>
      </div>
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <Select
            name="gender"
            label={gender.label}
            placeholder={gender.placeholder}
            options={options.gender}
            hasError={!!errors?.gender}
          />
        </Width>
        <Width width={50}>
          <Select
            name="maritalStatus"
            label={maritalStatus.label}
            placeholder={maritalStatus.placeholder}
            options={options.maritalStatus}
            hasError={!!errors?.maritalStatus}
          />
        </Width>
      </div>

      <div className="flex gap-32 flex-wrap">
        <DatePicker
          label={birthDate.label}
          {...register('birthDate', { required: birthDate.required })}
          width={50}
        />
        <Width width={50}>
          <Select
            name="nationality"
            label={nationality.label}
            placeholder={nationality.placeholder}
            options={options.nationality}
            hasError={!!errors?.nationality}
          />
        </Width>
      </div>
    </div>
  )
}
