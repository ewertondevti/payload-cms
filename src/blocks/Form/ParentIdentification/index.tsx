'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { InputText, InputDate } from '@ama-pt/agora-design-system'
import { InputSelect } from '@/components/ui/inputSelect'

type BirthRegisterProps = {
 errors: FieldErrors<FieldValues>
} & UseFormReturn<FieldValues>

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
export const BirthRegister: React.FC<BirthRegisterProps> = ({
 register,
 errors,
}) => {
 const getErrorMessage = (fieldName: string) => {
  if (errors[fieldName]?.type === 'required') {
   return 'Obrigatório preencher este campo.'
  }
  return ''
 }

 const OnChangee = () => {
  return (console.log('test'))
 }
 return (
  <div className="space-y-6">
   <h1>asdasd</h1>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputText
     label="Nome(s) próprio(s)"
     placeholder="Ex: Maria Clara"
     required
     hasError={!!errors['firstName']}
     feedbackText={getErrorMessage('firstName')}
     feedbackState="danger"
     {...register('firstName', { required: true })}
    />

    <InputText
     label="Apelido(s)"
     placeholder="Ex: Lopes"
     required
     hasError={!!errors['lastName']}
     feedbackText={getErrorMessage('lastName')}
     feedbackState="danger"
     {...register('lastName', { required: true })}
    />
   </div>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputSelect
     id={''} label="Documento de Identificação"
     placeholder="Selecione um documento"
     options={identificationOptions}
     hasError={!!errors['documentType']}
     {...register('documentType', { required: true })}
     onChange={(e) => register('documentType').onChange({ target: { value: e } })} />

    <InputText
     label="Número do documento (Opcional)"
     placeholder="Ex: 34567890 ZE"
     hasError={!!errors['documentNumber']}
     feedbackText={getErrorMessage('documentNumber')}
     feedbackState="danger"
     {...register('documentNumber')}
    />

    <InputText
     label="Dígito de verificação (Opcional)"
     placeholder="Ex: 12"
     hasError={!!errors['verificationDigit']}
     feedbackText={getErrorMessage('verificationDigit')}
     feedbackState="danger"
     {...register('verificationDigit')}
    />
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputSelect
     id={''} label="Gênero"
     placeholder="Selecione o gênero"
     options={genderOptions}
     hasError={!!errors['documentType']}
     {...register('documentType', { required: true })}
     onChange={(e) => register('documentType').onChange({ target: { value: e } })}
    />

    <InputSelect
     id={''} label="Estado civil"
     placeholder="Selecione uma opção"
     options={maritalStatusOptions}
     hasError={!!errors['maritalStatus']}
     {...register('documentType', { required: true })}
     onChange={(e) => register('documentType').onChange({ target: { value: e } })} />
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
     label="Data de nascimento"
     placeholder="dd/mm/aaaa"
     hasError={!!errors['birthDate']}
     feedbackText={getErrorMessage('birthDate')}
     feedbackState="danger"
     {...register('birthDate', { required: true })}
    />

    <InputSelect
     id={''} label="País de nacionalidade"
     placeholder="Selecione uma opção"
     options={nationalityOptions}
     hasError={!!errors['nationality']}
     {...register('documentType', { required: true })}
     onChange={(e) => register('documentType').onChange({ target: { value: e } })}
    />
   </div>
  </div >
 )
}
