import React, { useState, useEffect } from 'react'
import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { Width } from '../Width'
import { InputSelect } from '@/components/ui/inputSelect'

import { idDocumentOptions } from './options'

export const IdDocument: React.FC<
    TextField & {
    register: UseFormRegister<FieldValues>
  }
> = ({ name, label, required, width, register }) => {
  const { setValue } = useFormContext()
  const [selectedIdDocument, setSelectedIdDocument] = useState<string>('PT')

  const onChangeIdDocument = (value: string) => {
    setSelectedIdDocument(value)
    setValue(name, value)
  }

  useEffect(() => {
    register(name, { value: selectedIdDocument })
  }, [])

  return (
    <Width width={width}>
      <InputSelect
        id={name}
        value={selectedIdDocument}
        defaultValue="cc"
        type="text"
        label={label ?? 'Documento'}
        options={idDocumentOptions}
        placeholder="Selecione uma opção"
        visibleCount={5}
        searchable
        hideSectionNames
        searchInputPlaceholder="Pesquisar documento"
        dropdownAriaLabel="Lista de documentos"
        searchNoResultsText="Não foram encontrados resultados."
        onChange={onChangeIdDocument}
        required={required}
      />
    </Width>
  )
}
