import React from 'react'
import { TextField } from '@/components/ui/textfield'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { countryOptions } from '../../Country/options'
import { Select } from '../../Select'
import { Width } from '../Width'
import { DatePicker } from '@/components/DatePicker'

interface PlaceDateProps {
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >,
  register: UseFormRegister<FieldValues>
}

const PlaceDate: React.FC<PlaceDateProps> = ({ errors, register }) => {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex gap-32 flex-wrap">
        <Width width={100}>
          <TextField
            id={'cvtMorada'}
            label="Morada"
            placeholder="Indique a morada"
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
        </Width>
      </div>
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <Select
            defaultValue="PT"
            type="text"
            label="Distrito"
            options={countryOptions}
            placeholder="Selecione uma opção"
            visibleCount={5}
            searchable
            hideSectionNames
            searchInputPlaceholder="Pesquisar Distrito"
            dropdownAriaLabel="Lista de Distritos"
            searchNoResultsText="Não foram encontrados resultados."
          />
        </Width>
        <Width width={50}>
          <Select
            defaultValue="PT"
            type="text"
            label="Concelho"
            options={countryOptions}
            placeholder="Selecione uma opção"
            visibleCount={5}
            searchable
            hideSectionNames
            searchInputPlaceholder="Pesquisar Concelho"
            dropdownAriaLabel="Lista de Concelhos"
            searchNoResultsText="Não foram encontrados resultados."
          />
        </Width>
      </div>
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <Select
            defaultValue="PT"
            type="text"
            label="Freguesia"
            options={countryOptions}
            placeholder="Selecione uma opção"
            visibleCount={5}
            searchable
            hideSectionNames
            searchInputPlaceholder="Pesquisar Freguesia"
            dropdownAriaLabel="Lista de Freguesias"
            searchNoResultsText="Não foram encontrados resultados."
          />
        </Width>
      </div>

      <div className="flex gap-32 flex-wrap">
        <Width width={100}>
          <TextField
            id={'cvtMinistroCulto'}
            label="Nome do ministro de culto"
            placeholder="Indique o nome do ministro de culto"
            hasFeedback={true}
            feedbackState={'danger'}
            feedbackText={errors['cvtMinistroCulto']?.message?.toString()}
            hasError={errors['cvtMinistroCulto'] ? true : false}
            register={register}
          />
        </Width>
      </div>
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <DatePicker label="Data da cerimonia" {...register('birthDate')} />
        </Width>
      </div>
    </div>
  )
}
export default PlaceDate