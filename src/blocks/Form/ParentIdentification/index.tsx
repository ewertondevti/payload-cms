'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { InputText, InputDate } from '@ama-pt/agora-design-system'
import { InputSelect } from '@/components/ui/inputSelect'

type ParentIdentificationProps = {
 errors: FieldErrors<FieldValues>
 register: UseFormReturn<FieldValues>['register']

 firstNameLabel: string
 firstNamePlaceholder: string

 lastNameLabel: string
 lastNamePlaceholder: string

 documentTypeLabel: string
 documentTypePlaceholder: string

 documentNumberLabel: string
 documentNumberPlaceholder: string

 verificationDigitLabel: string
 verificationDigitPlaceholder: string

 genderLabel: string
 genderPlaceholder: string

 maritalStatusLabel: string
 maritalStatusPlaceholder: string

 birthDateLabel: string
 birthDatePlaceholder: string

 nationalityLabel: string
 nationalityPlaceholder: string
}

const identificationOptions = [
 { label: 'Cartão de Cidadão', value: 'cc' },
 { label: 'Passaporte', value: 'passport' },
 { label: 'Outro', value: 'other' },
]

const genderOptions = [
 { label: 'Feminino', value: 'female' },
 { label: 'Masculino', value: 'male' },
 { label: 'Outro', value: 'other' },
]

const maritalStatusOptions = [
 { label: 'Solteiro(a)', value: 'single' },
 { label: 'Casado(a)', value: 'married' },
 { label: 'Divorciado(a)', value: 'divorced' },
 { label: 'Viúvo(a)', value: 'widowed' },
]

const nationalityOptions = [
 { label: 'Portugal', value: 'PT' },
 { label: 'Brasil', value: 'BR' },
 { label: 'Outro', value: 'other' },
]

export const ParentIdentification: React.FC<ParentIdentificationProps> = ({
 register,
 errors,
 firstNameLabel,
 firstNamePlaceholder,
 lastNameLabel,
 lastNamePlaceholder,
 documentTypeLabel,
 documentTypePlaceholder,
 documentNumberLabel,
 documentNumberPlaceholder,
 verificationDigitLabel,
 verificationDigitPlaceholder,
 genderLabel,
 genderPlaceholder,
 maritalStatusLabel,
 maritalStatusPlaceholder,
 birthDateLabel,
 birthDatePlaceholder,
 nationalityLabel,
 nationalityPlaceholder,
}) => {
 const getErrorMessage = (fieldName: string) => {
  if (errors[fieldName]?.type === 'required') {
   return 'Obrigatório preencher este campo.'
  }
  return ''
 }
 console.log(lastNameLabel)
 console.log(lastNamePlaceholder)
 console.log(lastNameLabel)
 return (
  <div className="space-y-6">
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputText
     label={firstNameLabel}
     placeholder={firstNamePlaceholder}
     required
     hasError={!!errors['firstName']}
     feedbackText={getErrorMessage('firstName')}
     feedbackState="danger"
     {...register('firstName', { required: true })}
    />
    <InputText
     label={lastNameLabel}
     placeholder={lastNamePlaceholder}
     required
     hasError={!!errors['lastName']}
     feedbackText={getErrorMessage('lastName')}
     feedbackState="danger"
     {...register('lastName', { required: true })}
    />
   </div>
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputSelect
     id=""
     label={documentTypeLabel}
     placeholder={documentTypePlaceholder}
     options={identificationOptions}
     hasError={!!errors['documentType']}
     {...register('documentType', { required: true })}
     onChange={(e) => register('documentType').onChange({ target: { value: e } })}
    />
    <InputText
     label={documentNumberLabel}
     placeholder={documentNumberPlaceholder}
     hasError={!!errors['documentNumber']}
     feedbackText={getErrorMessage('documentNumber')}
     feedbackState="danger"
     {...register('documentNumber')}
    />
    <InputText
     label={verificationDigitLabel}
     placeholder={verificationDigitPlaceholder}
     hasError={!!errors['verificationDigit']}
     feedbackText={getErrorMessage('verificationDigit')}
     feedbackState="danger"
     {...register('verificationDigit')}
    />
   </div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputSelect
     id=""
     label={genderLabel}
     placeholder={genderPlaceholder}
     options={genderOptions}
     hasError={!!errors['gender']}
     {...register('gender', { required: true })}
     onChange={(e) => register('gender').onChange({ target: { value: e } })}
    />
    <InputSelect
     id=""
     label={maritalStatusLabel}
     placeholder={maritalStatusPlaceholder}
     options={maritalStatusOptions}
     hasError={!!errors['maritalStatus']}
     {...register('maritalStatus', { required: true })}
     onChange={(e) => register('maritalStatus').onChange({ target: { value: e } })}
    />
   </div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputDate
     calendarIconAriaLabel=""
     previousYearAriaLabel=""
     previousMonthAriaLabel=""
     nextMonthAriaLabel=""
     nextYearAriaLabel=""
     selectedDayAriaLabel=""
     todayDayAriaLabel=""
     todayLabel=""
     cancelLabel=""
     okLabel=""
     label={birthDateLabel}
     placeholder={birthDatePlaceholder}
     hasError={!!errors['birthDate']}
     feedbackText={getErrorMessage('birthDate')}
     feedbackState="danger"
     {...register('birthDate', { required: true })}
    />
    <InputSelect
     id=""
     label={nationalityLabel}
     placeholder={nationalityPlaceholder}
     options={nationalityOptions}
     hasError={!!errors['nationality']}
     {...register('nationality', { required: true })}
     onChange={(e) => register('nationality').onChange({ target: { value: e } })}
    />
   </div>
  </div>
 )
}
