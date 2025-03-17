import React from 'react'
import { Width } from '../../Width'


import { TextField } from '@/components/ui/textfield'
import { FieldErrorsImpl, FieldValues, RegisterOptions, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'
import { countryOptions } from '../../Country/options'
import { Select } from '../../Select'
import { DatePicker } from '@/components/DatePicker'

interface PlaceDateProps {

}

const PlaceDate: React.FC<
  PlaceDateProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ errors, register }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 flex-wrap">
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
      <div className="flex gap-4 flex-wrap">
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
      <div className="flex flex-col gap-6">
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

      <div className="flex flex-col gap-6">
        <Width width={100}>
          <TextField
            id={'cvtMorada'}
            label="Nome do ministro de culto"
            placeholder="Indique o nome do ministro de culto"
            hasFeedback={true}
            feedbackState={'danger'}
            feedbackText={errors['cvtMorada']?.message?.toString()}
            hasError={errors['cvtMorada'] ? true : false}
            register={register}
          />
        </Width>

        <div className="flex flex-col gap-6">
          <Width width={100}>
            <DatePicker
              label="Data da cerimonia"
              {...register('birthDate')}
              width={50}
            />
          </Width>
        </div>
      </div>
    </div>
  )
}
export default PlaceDate