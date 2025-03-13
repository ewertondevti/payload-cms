import React, { useState, useEffect } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { TextField } from '@/components/ui/textfield'
import { Select } from '@/blocks/Form/Select'
import { InputTextArea } from '@ama-pt/agora-design-system'
import { countryOptions } from '../Country/options'
import { useFormContext } from 'react-hook-form'
export interface AddressDataProps {
  name: string
}

export const AddressData: React.FC<
  AddressDataProps & {
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
    <div className="flex flex-col gap-16">
      <h2 className="font-bold text-xl text-[#021C51]">Dados da morada</h2>
      <div className="flex flex-col gap-8">
        <Select
          id="cvtResidencia"
          name="cvtResidencia"
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
        {selectedCountry === 'PT' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                id="cvtCodPostal"
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
                id="cvtLocalidade"
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
            <TextField
              id="cvtMorada"
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
            <div className="grid grid-cols-3 gap-4">
              <TextField
                id="cvtNumero-lote"
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
                id="cvtAndar"
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
                id="cvtPorta"
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
            id="cvtEstrangeira"
            label="Morada"
            placeholder="Indique a morada"
            hasError={errors['cvtEstrangeira'] ? true : false}
            required
            {...register('cvtEstrangeira')}
          />
        )}
      </div>
    </div>
  )
}
