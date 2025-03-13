import React, { useState, useEffect } from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { Select } from '@/blocks/Form/Select'

export interface DropdownProps {
  name: string
  label?: string
  ariaLabel?: string
  options?: { label: string; value: string }[]
  inputPlaceholder?: string
  required: boolean
}

export const Dropdown: React.FC<
  DropdownProps & {
    register: UseFormRegister<FieldValues>
  }
> = ({
  name = 'Selecione a opção',
  label = 'Selecionar',
  ariaLabel = 'Lista de opções',
  options,
  inputPlaceholder,
  required = false,
  register,
}) => {
  const { setValue } = useFormContext()
  const [selectedOption, setSelectedOption] = useState<string>('Opção 1')

  return (
    <Select
      id={name}
      {...{ name }}
      value={selectedOption}
      defaultValue="Opção 1"
      type="text"
      label={label}
      options={options || []}
      placeholder="Selecione uma opção"
      visibleCount={5}
      searchable
      hideSectionNames
      searchInputPlaceholder={inputPlaceholder}
      dropdownAriaLabel={ariaLabel}
      searchNoResultsText="Não foram encontrados resultados."
      onChange={setSelectedOption}
      required={required}
    />
  )
}
