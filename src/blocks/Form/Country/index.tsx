import { Select } from '@/blocks/Form/Select'
import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import React, { useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Width } from '../Width'

import { countryOptions } from './options'

export const Country: React.FC<CountryField & UseFormReturn> = ({
  name,
  label,
  required,
  width,
  register,
  setValue,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('PT')

  useEffect(() => {
    register(name, { value: selectedCountry })
  }, [])

  return (
    <Width width={width}>
      <Select
        id={name}
        {...{ name }}
        value={selectedCountry}
        defaultValue="PT"
        type="text"
        label={label ?? 'País'}
        options={countryOptions}
        placeholder="Selecione uma opção"
        visibleCount={5}
        searchable
        hideSectionNames
        searchInputPlaceholder="Pesquisar país"
        dropdownAriaLabel="Lista de países"
        searchNoResultsText="Não foram encontrados resultados."
        onChange={setSelectedCountry}
        required={required}
      />
    </Width>
  )
}
