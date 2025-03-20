'use client'
import React, { useEffect } from 'react'
import { FieldErrors, FieldValues, useForm, useFormContext, UseFormRegister } from 'react-hook-form'
import { InputText } from '@ama-pt/agora-design-system'
import { countryOptions } from '../../Country/options'
import { Width } from '../Width'
import { joinName } from '@/utilities/joinName'
import { Select } from '@/components/Select'


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
  name,
  register,
  errors,
}: {
  name: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}) => {
  const { watch } = useFormContext()
  const getError = (field: string) =>
    errors[field]?.type === 'required' ? 'Obrigatório preencher este campo.' : ''

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 flex-wrap">
        <Width width={50}>
          <Select
            id={joinName(name, 'cvcResidencia')}
            name={joinName(name, 'cvcResidencia')}
            defaultValue="PT"
            type="text"
            label="Residência"
            options={countryOptions}
            placeholder="Selecione uma opção"
            visibleCount={5}
            searchable
            hideSectionNames
            searchInputPlaceholder="Pesquisar país"
            dropdownAriaLabel="Lista de países"
            searchNoResultsText="Não foram encontrados resultados."
            required
          />
        </Width>
        <Width width={50}>
          <Select
            name="addressType"
            label="Tipo de via"
            placeholder="Selecione uma opção"
            options={addressOptions.addressType}
            required
            hasError={!!errors.addressType}
          />
        </Width>
      </div>

      <Width width={100}>
        <InputText
          name="wayDesignation"
          label="Designação de via"
          placeholder="Indique a designação da via"
          required
          hasError={!!errors.wayDesignation}
          feedbackText={getError('wayDesignation')}
          feedbackState="danger"
        />
      </Width>

      <div className="flex gap-4 flex-wrap">
        <Width width={33}>
          <InputText
            name="doorNumber"
            label="Porta"
            placeholder="Indique a porta"
            required
            hasError={!!errors.doorNumber}
            feedbackText={getError('doorNumber')}
            feedbackState="danger"
          />
        </Width>
        <Width width={33}>
          <InputText
            name="floor"
            label="Andar"
            placeholder="Indique o andar"
            required
            hasError={!!errors.floor}
            feedbackText={getError('floor')}
            feedbackState="danger"
          />
        </Width>
        <Width width={34}>
          <InputText
            name="side"
            label="Lado"
            placeholder="Indique o lado"
            required
            hasError={!!errors.side}
            feedbackText={getError('side')}
            feedbackState="danger"
          />
        </Width>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Width width={50}>
          <Select
            name="district"
            label="Distrito"
            placeholder="Selecione um distrito"
            options={addressOptions.district}
            required
            hasError={!!errors.district}
          />
        </Width>
        <Width width={50}>
          <Select
            name="municipality"
            label="Concelho"
            placeholder="Selecione um concelho"
            options={addressOptions.municipality}
            required
            hasError={!!errors.municipality}
          />
        </Width>
        <Width width={50}>
          <Select
            name="parish"
            label="Freguesia"
            placeholder="Selecione uma freguesia"
            options={addressOptions.parish}
            required
            hasError={!!errors.parish}
          />
        </Width>
        <Width width={50}>
          <InputText
            name="postalCode"
            label="Código Postal"
            placeholder="0000-000"
            required
            hasError={!!errors.postalCode}
            feedbackText={getError('postalCode')}
            feedbackState="danger"
          />
        </Width>
      </div>
    </div>
  )
}
