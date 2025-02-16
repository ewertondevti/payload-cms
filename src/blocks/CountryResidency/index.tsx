'use client'
import React, { useState, useEffect } from 'react'
import { UseFormReturn, FieldValues } from 'react-hook-form'
import { InputSearch, InputText } from '@ama-pt/agora-design-system'
import { InputSelect } from '@/components/ui/inputSelect'
import { countryOptions } from '../Form/Country/options'

type AddressFormProps = {
 country: {
  placeholder: string
  options: Array<{ label: string; value: string }>
  required: boolean
 }
 postalCode: {
  placeholder: string
  required: boolean
 }
 locality: {
  placeholder: string
  required: boolean
 }
 address: {
  placeholder: string
  required: boolean
 }
 numberLot: {
  placeholder: string
  required: boolean
 }
 floor: {
  placeholder: string
  required: boolean
 }
 door: {
  placeholder: string
  required: boolean
 }
} & UseFormReturn<FieldValues>;

export const AddressForm: React.FC<AddressFormProps> = ({
 country,
 postalCode,
 locality,
 address,
 numberLot,
 floor,
 door,
 register,
 setValue,
 getValues,
 formState: { errors },
}) => {
 const [selectedCountry, setSelectedCountry] = useState(getValues('country') || 'PT')

 useEffect(() => {
  if (country) {
   setValue('country', country.placeholder || 'PT');
  } else {
   setValue('country', 'PT');
  }

  if (postalCode) setValue('postalCode', postalCode.placeholder);
  if (locality) setValue('locality', locality.placeholder);
  if (address) setValue('address', address.placeholder);
  if (numberLot) setValue('numberLot', numberLot.placeholder);
  if (floor) setValue('floor', floor.placeholder);
  if (door) setValue('door', door.placeholder);
 }, [country, postalCode, locality, address, numberLot, floor, door, setValue]);

 const handleCountryChange = (option: string) => {
  setSelectedCountry(option)
  setValue('country', option)
 }

 return (
  <div>
   <div className="mb-4 max-w-[350px]">
    <InputSelect
     id="country"
     label="País de residência"
     options={countryOptions}
     searchable
     hideSectionNames
     searchInputPlaceholder="Pesquisar país"
     dropdownAriaLabel="Lista de países"
     searchNoResultsText="Não foram encontrados resultados."
     value={selectedCountry}
     onChange={handleCountryChange}
     className="max-w-[350px]"
    />
   </div>

   <div className="flex flex-col gap-6">
    {selectedCountry === 'PT' ? (
     <>
      <div className="grid grid-cols-2 mt-3 gap-4">
       <div>
        <InputSearch
         id="postalCode"
         label="Código Postal"
         {...register('postalCode', { required: true })}
         hasError={!!errors.postalCode}
         feedbackState="danger"
         feedbackText="Obrigatório preencher 'Código Postal'"
        />
       </div>
       <div>
        <InputText
         id="locality"
         label="Localidade"
         {...register('locality', { required: true })}
         hasError={!!errors.locality}
         feedbackState="danger"
         feedbackText="Obrigatório preencher 'Localidade'"
        />
       </div>
      </div>

      <div className="grid grid-cols-1">
       <InputText
        id="address"
        label="Morada"
        {...register('address', { required: true })}
        hasError={!!errors.address}
        feedbackState="danger"
        feedbackText="Obrigatório preencher 'Morada'"
       />
      </div>

      <div className="grid grid-cols-3 gap-4">
       <div>
        <InputText
         id="numberLot"
         label="Número / Lote"
         {...register('numberLot', { required: true })}
         hasError={!!errors.numberLot}
         feedbackState="danger"
         feedbackText="Obrigatório preencher 'Número / Lote'"
        />
       </div>
       <div>
        <InputText
         id="floor"
         label="Andar (Opcional)"
         {...register('floor')}
        />
       </div>
       <div>
        <InputText
         id="door"
         label="Porta (Opcional)"
         {...register('door')}
        />
       </div>
      </div>
     </>
    ) : (
     <div >
      <div className="grid grid-cols-1">
       <InputText
        id="address"
        label="Morada"
        placeholder="Indique a morada atual"
        {...register('address', { required: true })}
        hasError={!!errors.address}
        feedbackState="danger"
        feedbackText="Obrigatório preencher 'Morada'"
        className="min-w-[850px]"
       />
      </div>
     </div>
    )}
   </div>
  </div>
 )
}
