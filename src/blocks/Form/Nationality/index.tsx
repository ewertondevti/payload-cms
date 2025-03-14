import { Select } from '@/blocks/Form/Select'
import { RadioButton, RadioButtonGroup } from '@ama-pt/agora-design-system'
import React, { useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { countryOptions } from '../Country/options'

export const Nationality: React.FC<UseFormReturn> = ({ register, setValue }) => {
  const [nationalityRadio, setNationalityRadio] = useState<string>('portuguesa')
  const [selectedNationality, setSelectedNationality] = useState<string>('PT')

  useEffect(() => {
    register('nacionalidade', { value: nationalityRadio })
  }, [])

  return (
    <div className="flex items-center">
      <div className="w-full">
        <RadioButtonGroup
          onChange={(e) => {
            setNationalityRadio(e.target.value)
            setValue('nacionalidade', e.target.value)
          }}
        >
          <RadioButton
            label="Portuguesa"
            value="portuguesa"
            key="portuguesa"
            checked={nationalityRadio === 'portuguesa'}
          />
          <RadioButton
            label="Outra Nacionalidade"
            value="outra"
            key="outra"
            checked={nationalityRadio === 'outra'}
          />
        </RadioButtonGroup>
      </div>
      <div className="w-full">
        <Select
          id="nacionalidade"
          name="nacionalidade"
          value={selectedNationality}
          defaultValue="PT"
          type="text"
          label="Nacionalidade"
          options={countryOptions}
          placeholder="Selecione uma opção"
          visibleCount={5}
          searchable
          hideSectionNames
          searchInputPlaceholder="Pesquisar nacionalidade"
          dropdownAriaLabel="Lista de nacionalidades"
          searchNoResultsText="Não foram encontrados resultados."
          onChange={setSelectedNationality}
          disabled={nationalityRadio === 'portuguesa'}
        />
      </div>
    </div>
  )
}
