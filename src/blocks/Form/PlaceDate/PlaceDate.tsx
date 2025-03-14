import React from 'react'
import { Width } from '../Width'
import { TextField } from '@/components/ui/textfield'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { countryOptions } from '../Country/options'
import { Select } from '../Select'

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
      searchInputPlaceholder="Pesquisar país"
      dropdownAriaLabel="Lista de países"
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
      searchInputPlaceholder="Pesquisar país"
      dropdownAriaLabel="Lista de países"
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
      searchInputPlaceholder="Pesquisar país"
      dropdownAriaLabel="Lista de países"
      searchNoResultsText="Não foram encontrados resultados."
     />
    </Width>
   </div>

   <div className="flex flex-col gap-6">
    <Width width={100}>
     <Select
      id={'cvtMorada'}
      label="Morada"
      placeholder="Indique a morada"

      hasError={errors['cvtMorada'] ? true : false} options={[]} />
    </Width>
   </div>
  </div>
 )
}
export default PlaceDate