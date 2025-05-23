import { InputText } from '@ama-pt/agora-design-system'
import React from 'react'
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { SelectWithApi, SelectWithAPIProps } from '../SelectWithAPI'
import { Width } from '../Width'

export type LocationProps = {
  name: string
  width: number
  apidomain: string
  required: boolean
  label: string
}

export const LocationField: React.FC<
  LocationProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ register, watch, required, errors, label, name, ...props }) => {
  const selectedCountry: string = watch(`${name}-country`)
  const isPtSelected = selectedCountry === 'Portugal'

  const commonProps: Partial<SelectWithAPIProps> = {
    width: 50,
    visibleCount: 5,
    searchable: true,
  }

  const countryProps: SelectWithAPIProps = {
    ...commonProps,

    apidomain: 'https://restcountries.com/v3.1/all',
    placeholder: 'Selecione um país',
    label,
  }

  const distritoProps: SelectWithAPIProps = {
    ...commonProps,

    apidomain: 'https://restcountries.com/v3.1/all',
    placeholder: 'Selecione um distrito',
    label: 'Distrito',
  }

  const concelhoProps: SelectWithAPIProps = {
    ...commonProps,

    apidomain: 'https://restcountries.com/v3.1/all',
    placeholder: 'Selecione um concelho',
    label: 'Concelho',
  }

  const freguesiaProps: SelectWithAPIProps = {
    ...commonProps,

    apidomain: 'https://restcountries.com/v3.1/all',
    placeholder: 'Selecione uma freguesia',
    label: 'Freguesia',
  }

  const locationProps = {
    ...props,

    placeholder: 'Indique a localidade',
    label: 'Local',
    register,
    watch,
  }

  return (
    <Width width={100}>
      <div className="flex flex-wrap gap-[32px]">
        <SelectWithApi
          {...countryProps}
          hasError={!!errors[`${name}-country`]}
          defaultValue="Portugal"
        />

        {isPtSelected && <SelectWithApi {...distritoProps} hasError={!!errors['distrito']} />}

        {isPtSelected && <SelectWithApi {...concelhoProps} hasError={!!errors['concelho']} />}

        {isPtSelected && <SelectWithApi {...freguesiaProps} hasError={!!errors['freguesia']} />}

        {!isPtSelected && (
          <Width width={50}>
            <InputText
              {...locationProps}
              {...register(`${name}-location`, { required: true })}
              feedbackState="danger"
              feedbackText={`Obrigatório preencher "${locationProps.label}"`}
              hasError={!!errors['location']}
            />
          </Width>
        )}
      </div>
    </Width>
  )
}
