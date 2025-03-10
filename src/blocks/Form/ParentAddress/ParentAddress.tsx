'use client'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { InputText } from '@ama-pt/agora-design-system'
import { InputSelect } from '@/components/ui/inputSelect'
import { Width } from '../Width'

interface FieldConfig {
 label: string
 placeholder: string
 required?: boolean
}

interface ParentAddressProps {
 errors: FieldErrors<FieldValues>
 register: UseFormRegister<FieldValues>
 countryOfResidence: FieldConfig
 addressType: FieldConfig
 wayDesignation: FieldConfig
 doorNumber: FieldConfig
 floor: FieldConfig
 side: FieldConfig
 district: FieldConfig
 municipality: FieldConfig
 parish: FieldConfig
 postalCode: FieldConfig
}

const addressOptions = {
 countryOfResidence: [
  { label: 'Portugal', value: 'PT' },
  { label: 'Brasil', value: 'BR' },
  { label: 'Outro', value: 'other' },
 ],
 addressType: [
  { label: 'Rua', value: 'rua' },
  { label: 'Avenida', value: 'avenida' },
  { label: 'Travessa', value: 'travessa' },
 ],
 district: [
  { label: 'Lisboa', value: 'Lisboa' },
  { label: 'Porto', value: 'Porto' },
  { label: 'Coimbra', value: 'Coimbra' },
 ],
 municipality: [
  { label: 'Lisboa', value: 'Lisboa' },
  { label: 'Oeiras', value: 'Oeiras' },
  { label: 'Sintra', value: 'Sintra' },
 ],
 parish: [
  { label: 'Alvalade', value: 'Alvalade' },
  { label: 'Areeiro', value: 'Areeiro' },
  { label: 'Benfica', value: 'Benfica' },
 ],
}

export const ParentAddress = ({
 register,
 errors,
 countryOfResidence,
 addressType,
 wayDesignation,
 doorNumber,
 floor,
 side,
 district,
 municipality,
 parish,
 postalCode,
}: ParentAddressProps) => {
 const getError = (field: string) =>
  errors[field]?.type === 'required' ? 'Obrigatório preencher este campo.' : ''

 return (
  <div className="flex flex-col gap-6">
   <div className="flex gap-4 flex-wrap">
    <Width width={50}>
     <InputSelect
      label={countryOfResidence.label}
      placeholder={countryOfResidence.placeholder}
      options={addressOptions.countryOfResidence}
      required={countryOfResidence.required}
      hasError={!!errors.countryOfResidence}
      {...register('countryOfResidence', {
       required: countryOfResidence.required,
      })}
      onChange={(e) =>
       register('countryOfResidence').onChange({ target: { value: e } })
      }
     />
    </Width>
    <Width width={50}>
     <InputSelect
      label={addressType.label}
      placeholder={addressType.placeholder}
      options={addressOptions.addressType}
      required={addressType.required}
      hasError={!!errors.addressType}
      {...register('addressType', { required: addressType.required })}
      onChange={(e) =>
       register('addressType').onChange({ target: { value: e } })
      }
     />
    </Width>
   </div>

   <Width width={100}>
    <InputText
     label={wayDesignation.label}
     placeholder={wayDesignation.placeholder}
     required={wayDesignation.required}
     hasError={!!errors.wayDesignation}
     feedbackText={getError('wayDesignation')}
     feedbackState="danger"
     {...register('wayDesignation', { required: wayDesignation.required })}
    />
   </Width>

   <div className="flex gap-4 flex-wrap">
    <Width width={33}>
     <InputText
      label={doorNumber.label}
      placeholder={doorNumber.placeholder}
      required={doorNumber.required}
      hasError={!!errors.doorNumber}
      feedbackText={getError('doorNumber')}
      feedbackState="danger"
      {...register('doorNumber', { required: doorNumber.required })}
     />
    </Width>
    <Width width={33}>
     <InputText
      label={floor.label}
      placeholder={floor.placeholder}
      required={floor.required}
      hasError={!!errors.floor}
      feedbackText={getError('floor')}
      feedbackState="danger"
      {...register('floor', { required: floor.required })}
     />
    </Width>
    <Width width={34}>
     <InputText
      label={side.label}
      placeholder={side.placeholder}
      required={side.required}
      hasError={!!errors.side}
      feedbackText={getError('side')}
      feedbackState="danger"
      {...register('side', { required: side.required })}
     />
    </Width>
   </div>

   <div className="flex gap-4 flex-wrap">
    <Width width={50}>
     <InputSelect
      label={district.label}
      placeholder={district.placeholder}
      options={addressOptions.district}
      required={district.required}
      hasError={!!errors.district}
      {...register('district', { required: district.required })}
      onChange={(e) => register('district').onChange({ target: { value: e } })}
     />
    </Width>
    <Width width={50}>
     <InputSelect
      label={municipality.label}
      placeholder={municipality.placeholder}
      options={addressOptions.municipality}
      required={municipality.required}
      hasError={!!errors.municipality}
      {...register('municipality', { required: municipality.required })}
      onChange={(e) =>
       register('municipality').onChange({ target: { value: e } })
      }
     />
    </Width>
    <Width width={50}>
     <InputSelect
      label={parish.label}
      placeholder={parish.placeholder}
      options={addressOptions.parish}
      required={parish.required}
      hasError={!!errors.parish}
      {...register('parish', { required: parish.required })}
      onChange={(e) => register('parish').onChange({ target: { value: e } })}
     />
    </Width>
    <Width width={50}>
     <InputText
      label={postalCode.label}
      placeholder={postalCode.placeholder}
      required={postalCode.required}
      hasError={!!errors.postalCode}
      feedbackText={getError('postalCode')}
      feedbackState="danger"
      {...register('postalCode', { required: postalCode.required })}
     />
    </Width>
   </div>
  </div>
 )
}
