import React from 'react'
import { Width } from '../Width'
import { countryOptions } from '@/components/Country/options'
import { Select } from '@/components/Select'
import { TextField } from '@/components/ui/textfield'
import { DatePicker } from '@/components/DatePicker'
import { TimePicker } from '@/components/TimePicker'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Checkbox } from '@/blocks/Form/Checkbox'

interface WeddingCeremonyProps {
 errors: Partial<
  FieldErrorsImpl<{
   [x: string]: any
  }>
 >
 register: UseFormRegister<FieldValues>
}

const WeddingCeremony: React.FC<WeddingCeremonyProps> = ({ errors, register }) => {
 return (
  <div className="flex flex-col gap-32">
   <div className="flex gap-32 flex-wrap">
    <Width width={50}>
     <Select
      id={'cvtLocalCasamento'}
      name={'cvtLocalCasamento'}
      type="text"
      label="Local do casamento"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar local"
      dropdownAriaLabel="Lista de locais"
      searchNoResultsText="Não foram encontrados resultados."
      required
     />
    </Width>
    <Width width={50}>
     <Select
      id={'cvtConservatoria'}
      name={'cvtConservatoria'}
      type="text"
      label="Estado Civil"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar conservatória"
      dropdownAriaLabel="Lista de conservatórias"
      searchNoResultsText="Não foram encontrados resultados."
      required
     />
    </Width>
   </div>

   <div className="flex gap-32 flex-wrap">
    <Width width={50}>
     <Select
      id={'cvtEstadoCivil'}
      name={'cvtEstadoCivil'}
      type="text"
      label="Estado civil"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar estado civil"
      dropdownAriaLabel="Lista de estados civis"
      searchNoResultsText="Não foram encontrados resultados."
      required
     />
    </Width>
    <Width width={50}>
     <Select
      id={'cvtDistritoConservatoria'}
      name={'cvtDistritoConservatoria'}
      type="text"
      label="Distrito da conservatória"
      options={countryOptions}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder="Pesquisar distrito"
      dropdownAriaLabel="Lista de distritos"
      searchNoResultsText="Não foram encontrados resultados."
      required
     />
    </Width>
   </div>

   <div className="flex gap-32 flex-wrap">
    <Width width={50}>
     <DatePicker
      required
      label="Data da cerimónia"
      {...register('ceremonyDate')}
     />
    </Width>
    <Width width={50}>
     <TimePicker
      required
      label="Hora da cerimónia"
      {...register('ceremonyTime')}
     />
    </Width>
   </div>

   <div className="flex gap-32 flex-wrap">
    <Width width={100}>
     <div className="flex gap-32 flex-wrap">
      <Checkbox
       name="acknowledgeDate"
       label="Tomei conhecimento que a data indicada é meramente indicativa, e sujeita a acordo com o conservador."
       required={true}
       errors={errors}
       register={register}
       width={100}
      />
     </div>
    </Width>
   </div>

   <div className="flex gap-32 flex-wrap">
    <Width width={100}>
     <TextField
      id={'cvtMinistroCulto'}
      label="Nome do ministro de culto"
      placeholder="Indique o nome do ministro de culto"
      required
      hasFeedback={true}
      hasError={errors['cvtMinistroCulto'] ? true : false}
      feedbackState={'danger'}
      feedbackText={errors['cvtMinistroCulto']?.message?.toString()}
      validation={{
       pattern: {
        value: /^[\p{L}\s'-]+$/u,
        message: 'Nome inválido',
       },
      }}
      register={register}
     />
    </Width>
   </div>
  </div>
 )
}

export default WeddingCeremony