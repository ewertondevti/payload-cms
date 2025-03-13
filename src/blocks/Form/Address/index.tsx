import { Select } from '@/blocks/Form/Select'
import { TextField } from '@/components/ui/textfield'
import { InputTextArea } from '@ama-pt/agora-design-system'
import React, { useEffect, useState } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { countryOptions } from '../Country/options'

export interface AddressProps {
  name: string
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
> = ({ name, errors, register }) => {
  const { setValue } = useFormContext()
  const [selectedCountry, setSelectedCountry] = useState<string>('PT')

  return (
    <>
      <Select
        id={'cvtResidencia'}
        name={'cvtResidencia'}
        value={selectedCountry}
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
        onChange={setSelectedCountry}
      />
      <br />
      {selectedCountry === 'PT' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id={'cvtCodPostal'}
              hasError={errors['cvtCodPostal'] ? true : false}
              label="Código Postal"
              placeholder="Indique o código postal"
              required
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
              label="Localidade"
              placeholder="Indique a localidade"
              required
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
            label="Morada"
            placeholder="Nome de rua ou avenida"
            required
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
              label="Número / Lote"
              placeholder="Indique o número ou lote"
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
              label="Andar"
              placeholder="Indique o andar"
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
              label="Porta"
              placeholder="Indique o nº, letra ou lado"
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
