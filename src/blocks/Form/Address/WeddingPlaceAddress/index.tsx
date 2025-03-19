import { TextField } from '@/components/ui/textfield'
import React from 'react'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { countryOptions } from '../../Country/options'
import { DatePicker } from '../../DatePicker'
import { Select } from '../../Select'
import { TimePicker } from '../../TimePicker'
import { Width } from '../../Width'

interface WeddingPlaceAddressProps {
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
  register: UseFormRegister<FieldValues>
}

const WeddingPlaceAddress: React.FC<WeddingPlaceAddressProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 flex-wrap">
        <Width width={50}>
          <Select
            id={'cvtResidencia'}
            name={'cvtResidencia'}
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
      </div>

      <div className="flex gap-4 flex-wrap">
        <Width width={50}>
          <Select
            id={'cvtResidencia'}
            name={'cvtResidencia'}
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
        </Width>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Width width={50}>
          <DatePicker required label="Data da cerimonia" {...register('birthDate')} />
        </Width>
        <Width width={50}>
          <TimePicker required label="Hora da cerimónia" {...register('ceremonyTime')} />
        </Width>
      </div>
    </div>
  )
}
export default WeddingPlaceAddress
