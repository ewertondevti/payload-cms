import React, { useState, useEffect } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Select } from '@/blocks/Form/Select'
import { TextField } from '@/components/ui/textfield'
import { useFormContext } from 'react-hook-form'
import { idDocumentOptions } from '../IdDocument/options'
import { Nif } from '../Nif'

export interface IdDataProps {
  name: string
}

export const IdData: React.FC<
  IdDataProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, errors, register }) => {
  const { setValue } = useFormContext()
  const [selectedIdDocument, setSelectedIdDocument] = useState<string>('cc')

  useEffect(() => {
    register('cvtDocumento', { value: selectedIdDocument })
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-bold text-xl text-[#021C51]">Dados de identificação</h2>
      <TextField
        id="cvtNome"
        label="Nome completo"
        placeholder="Indique o seu nome completo"
        required
        hasFeedback={true}
        feedbackState={'danger'}
        feedbackText={errors[name + 'nome']?.message?.toString()}
        validation={{
          pattern: {
            value: /^[\p{L}\d\s'-]+$/u,
            message: 'Nome inválido',
          },
        }}
        hasError={errors[name + 'Nome'] ? true : false}
        register={register}
      />
      <div className="grid grid-cols-2 gap-4 overflow-hidden">
        <Select
          id="cvtDocumento"
          name="cvtDocumento"
          label="Documento de identificação"
          value={selectedIdDocument}
          type="text"
          options={idDocumentOptions}
          placeholder="Selecione uma opção"
          hideSectionNames
          onChange={setSelectedIdDocument}
        />
        <TextField
          id="cvtNrDocumento"
          label="Número do documento"
          placeholder="Indique o número do documento"
          required
          hasFeedback={true}
          feedbackState={'danger'}
          feedbackText={errors['cvtNrDocumento']?.message?.toString()}
          validation={{
            pattern: {
              value: /^[\p{L}\d\s'-]+$/u,
              message: 'Número de documento inválido',
            },
          }}
          hasError={errors['cvtNrDocumento'] ? true : false}
          register={register}
        />
        <Nif
          id="cvtNIF"
          name="NIF"
          label="Número de Identificação Fiscal (NIF)"
          blockType="nif"
          placeholder="Indique o NIF"
          required
          errors={errors}
          register={register}
        />
      </div>
    </div>
  )
}
