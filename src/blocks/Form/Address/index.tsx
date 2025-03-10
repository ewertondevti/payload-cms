import { InputSelect } from '@/components/ui/inputSelect'
import { TextField } from '@/components/ui/textfield'
import { InputTextArea } from '@ama-pt/agora-design-system'
import React, { useEffect, useState } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { countryOptions } from '../Country/options'
import { Width } from '../Width'

interface FieldsConfig {
  label: string
  placeholder: string
  required?: boolean
}

export interface AddressProps {
  residency: FieldsConfig
  postalCode: FieldsConfig
  location: FieldsConfig
  address: FieldsConfig
  addressName: FieldsConfig
  addressFloor: FieldsConfig
  addressDoor: FieldsConfig
}

export const Address: React.FC<
  AddressProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ errors, register, addressFloor, residency, postalCode, location, address, addressName, addressDoor }) => {
  const { setValue } = useFormContext()
  const [selectedCountry, setSelectedCountry] = useState<string>('PT')

  const onChangeCountry = (value: string) => {
    setSelectedCountry(value)
    setValue(`cvtResidencia`, value)
  }

  useEffect(() => {
    register(`cvtResidencia`, { value: selectedCountry })
  }, [])

  return (
    <>
      <Width width={50}>
        <InputSelect
          id={'cvtResidencia'}
          value={selectedCountry}
          defaultValue="PT"
          type="text"
          label={residency.label}
          required={residency.required}
          placeholder={residency.placeholder}
          options={countryOptions}
          visibleCount={5}
          searchable
          hideSectionNames
          searchInputPlaceholder="Pesquisar país"
          dropdownAriaLabel="Lista de países"
          searchNoResultsText="Não foram encontrados resultados."
          onChange={onChangeCountry}
        />
      </Width>

      <br />
      {selectedCountry === 'PT' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id={'cvtCodPostal'}
              hasError={errors['cvtCodPostal'] ? true : false}
              label={postalCode.label}
              placeholder={postalCode.placeholder}
              required={postalCode.required}
              hasFeedback={true}
              feedbackState={'danger'}
              feedbackText={errors['cvtCodPostal']?.message?.toString()}
              validation={{
                pattern: {
                  value: /^\d{4}-?\d{3}$/,
                  message: 'Código postal inválido',
                },
              }}
              register={register}
            />

            <TextField
              id={'cvtLocalidade'}
              label={location.label}
              placeholder={location.placeholder}

              required={location.required}
              hasFeedback={true}
              hasError={errors['cvtLocalidade'] ? true : false}
              feedbackState={'danger'}
              feedbackText={errors['cvtLocalidade']?.message?.toString()}
              validation={{
                pattern: {
                  value: /^[\p{L}\s'-]+$/u,
                  message: 'Localidade inválida',
                },
              }}
              register={register}
            />
          </div>
          <br />
          <TextField
            id={'cvtMorada'}
            label={address.label}
            placeholder={address.placeholder}
            required={address.required}
            hasFeedback={true}
            feedbackState={'danger'}
            feedbackText={errors['cvtMorada']?.message?.toString()}
            validation={{
              pattern: {
                value: /^[\p{L}\d\s'-]+$/u,
                message: 'Morada inválida',
              },
            }}
            hasError={errors['cvtMorada'] ? true : false}
            register={register}
          />
          <br />
          <div className="grid grid-cols-3 gap-4">
            <TextField
              id={'cvtNumero-lote'}
              label={addressName.label}
              placeholder={addressName.placeholder}
              required={addressName.required}
              hasFeedback={true}
              feedbackState={'danger'}
              feedbackText={errors['cvtNumero-lote']?.message?.toString()}
              validation={{
                pattern: {
                  value: /^[\d\w\s]+$/,
                  message: 'Lote inválido',
                },
              }}
              hasError={errors['cvtNumero-lote'] ? true : false}
              register={register}
            />
            <TextField
              id={'cvtAndar'}
              label={addressFloor.label}
              placeholder={addressFloor.placeholder}
              required={addressFloor.required}
              hasFeedback={true}
              feedbackState={'danger'}
              feedbackText={errors['cvtAndar']?.message?.toString()}
              hasError={errors['cvtAndar'] ? true : false}
              validation={{
                pattern: {
                  value: /^[\w\d]+$/,
                  message: 'Andar inválido',
                },
              }}
              register={register}
            />
            <TextField
              id={'cvtPorta'}
              label={addressDoor.label}
              placeholder={addressDoor.placeholder}
              required={addressDoor.required}
              hasFeedback={true}
              feedbackState={'danger'}
              feedbackText={errors['cvtPorta']?.message?.toString()}
              validation={{
                pattern: {
                  value: /^[\w\d]+$/,
                  message: 'Porta inválida',
                },
              }}
              hasError={errors['cvtPorta'] ? true : false}
              register={register}
            />
          </div>
        </>
      ) : (
        <InputTextArea
          id={'cvtEstrangeira'}
          label="Morada"
          placeholder="Indique a morada"
          hasError={errors['cvtEstrangeira'] ? true : false}
          required
          {...register('cvtEstrangeira')}
        />
      )}
    </>
  )
}
