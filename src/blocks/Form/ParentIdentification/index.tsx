'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { InputText, InputDate } from '@ama-pt/agora-design-system'
import { InputSelect } from '@/components/ui/inputSelect'
import { Width } from '../Width'

interface FieldConfig {
 label: string
 placeholder: string
 required?: boolean
}

interface ParentIdentificationProps {
 errors: FieldErrors<FieldValues>
 register: UseFormRegister<FieldValues>
 firstName: FieldConfig
 lastName: FieldConfig
 documentType: FieldConfig
 documentNumber: FieldConfig
 verificationDigit: FieldConfig
 gender: FieldConfig
 maritalStatus: FieldConfig
 birthDate: FieldConfig
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
 ]
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
}: ParentIdentificationProps) => {
 const getError = (field: string) =>
  errors[field]?.type === 'required' ? 'Obrigatório preencher este campo.' : ''

 return (
  <div className="flex flex-col gap-6">
   {/* Nome */}
   <div className="flex gap-4 flex-wrap">
    <Width width={50}>
     <InputText
      label={firstName.label}
      placeholder={firstName.placeholder}
      required={firstName.required}
      hasError={!!errors.firstName}
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
      hasError={!!errors.lastName}
      feedbackText={getError('lastName')}
      feedbackState="danger"
      {...register('lastName', { required: lastName.required })}
     />
    </Width>
   </div>

   {/* Documento */}
   <div className="flex gap-4 flex-wrap">
    <Width width={33}>
     <InputSelect
      label={documentType.label}
      placeholder={documentType.placeholder}
      options={options.identification}
      hasError={!!errors.documentType}
      {...register('documentType', { required: documentType.required })}
      onChange={(e) => register('documentType').onChange({ target: { value: e } })}
     />
    </Width>
    <Width width={33}>
     <InputText
      label={documentNumber.label}
      placeholder={documentNumber.placeholder}
      required={documentNumber.required}
      hasError={!!errors.documentNumber}
      feedbackText={getError('documentNumber')}
      feedbackState="danger"
      {...register('documentNumber', { required: documentNumber.required })}
     />
    </Width>
    <Width width={34}>
     <InputText
      label={verificationDigit.label}
      placeholder={verificationDigit.placeholder}
      required={verificationDigit.required}
      hasError={!!errors.verificationDigit}
      feedbackText={getError('verificationDigit')}
      feedbackState="danger"
      {...register('verificationDigit', { required: verificationDigit.required })}
     />
    </Width>
   </div>

   {/* Gênero e Estado Civil */}
   <div className="flex gap-4 flex-wrap">
    <Width width={50}>
     <InputSelect
      label={gender.label}
      placeholder={gender.placeholder}
      options={options.gender}
      hasError={!!errors.gender}
      {...register('gender', { required: gender.required })}
      onChange={(e) => register('gender').onChange({ target: { value: e } })}
     />
    </Width>
    <Width width={50}>
     <InputSelect
      label={maritalStatus.label}
      placeholder={maritalStatus.placeholder}
      options={options.maritalStatus}
      hasError={!!errors.maritalStatus}
      {...register('maritalStatus', { required: maritalStatus.required })}
      onChange={(e) => register('maritalStatus').onChange({ target: { value: e } })}
     />
    </Width>
   </div>

   {/* Data de Nascimento e Nacionalidade */}
   <div className="flex gap-4 flex-wrap">
    <Width width={50}>
     <InputDate
      calendarIconAriaLabel={''} previousYearAriaLabel={''} previousMonthAriaLabel={''} nextMonthAriaLabel={''} nextYearAriaLabel={''} selectedDayAriaLabel={''} todayDayAriaLabel={''} todayLabel={''} cancelLabel={''} okLabel={''} label={birthDate.label}
      placeholder={birthDate.placeholder}
      required={birthDate.required}
      hasError={!!errors.birthDate}
      feedbackText={getError('birthDate')}
      feedbackState="danger"
      {...register('birthDate', { required: birthDate.required })} />
    </Width>
    <Width width={50}>
     <InputSelect
      label={nationality.label}
      placeholder={nationality.placeholder}
      options={options.nationality}
      hasError={!!errors.nationality}
      {...register('nationality', { required: nationality.required })}
      onChange={(e) => register('nationality').onChange({ target: { value: e } })}
     />
    </Width>
   </div>
  </div>
 )
}