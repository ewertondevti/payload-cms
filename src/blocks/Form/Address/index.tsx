import { InputText } from '@ama-pt/agora-design-system'
import React from 'react'
import type { FieldErrorsImpl, UseFormReturn } from 'react-hook-form'
import { SelectWithApi, SelectWithAPIProps } from '../SelectWithAPI'
import { Width } from '../Width'

export interface AdressProps {
  name: string
}

export const Address: React.FC<
  AdressProps &
    UseFormReturn & {
      width: number
      apidomain: string
      required: boolean
      errors: Partial<
        FieldErrorsImpl<{
          [x: string]: any
        }>
      >
    }
> = ({ register, watch, required, errors, ...props }) => {
  const selectedCountry: string = watch('countryBirth')
  const isPtSelected = selectedCountry === 'Portugal'

  const commonProps: SelectWithAPIProps = {
    ...props,

    register,
    watch,
    width: 50,
    visibleCount: 5,
    searchable: true,
  }

  const countryProps: SelectWithAPIProps = {
    ...commonProps,

    apidomain: 'https://restcountries.com/v3.1/all',
    placeholder: 'Selecione um país',
    label: 'País de naturalidade',
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
          {...register('countryBirth', { required: true })}
          onChange={undefined}
          feedbackState="danger"
          feedbackText={`Obrigatório preencher "${countryProps.label}"`}
          hasError={!!errors['countryBirth']}
        />

        {isPtSelected && (
          <SelectWithApi
            {...distritoProps}
            {...register('distrito', { required: true })}
            onChange={undefined}
            feedbackState="danger"
            feedbackText={`Obrigatório preencher "${distritoProps.label}"`}
            hasError={!!errors['distrito']}
          />
        )}

        {isPtSelected && (
          <SelectWithApi
            {...concelhoProps}
            {...register('concelho', { required: true })}
            onChange={undefined}
            feedbackState="danger"
            feedbackText={`Obrigatório preencher "${concelhoProps.label}"`}
            hasError={!!errors['concelho']}
          />
        )}

        {isPtSelected && (
          <SelectWithApi
            {...freguesiaProps}
            {...register('freguesia', { required: true })}
            onChange={undefined}
            feedbackState="danger"
            feedbackText={`Obrigatório preencher "${freguesiaProps.label}"`}
            hasError={!!errors['freguesia']}
          />
        )}

        {!isPtSelected && (
          <Width width={50}>
            <InputText
              {...locationProps}
              {...register('location', { required: true })}
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
