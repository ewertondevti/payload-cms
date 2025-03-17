'use client'
import React, { FC, useState } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { DatePicker } from '@/blocks/Form/DatePicker'
import { CustomNumber } from '../../CustomNumber'
import { Select } from '@/blocks/Form/Select'

type PriorWeddingChildrenDataProps = { name: string }

export const PriorWeddingChildrenData: FC<
  PriorWeddingChildrenDataProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ register, errors }) => {
  const [parentRelationship, setParentRelationship] = useState<string>()

  return (
    <div className="flex flex-wrap gap-32 w-full">
      <Select
        name="parentRelationship"
        label="Quando a criança nasceu"
        placeholder="Selecione uma opção"
        width={50}
        options={[
          { label: 'Os pais eram casados', value: 'married' },
          { label: 'Os pais não eram casados mas viviam juntos', value: 'unmarried' },
          { label: 'Os pais não eram casados nem viviam juntos', value: 'neither' },
          { label: 'Não sabe/não responde', value: 'unknown' },
        ]}
        onChange={setParentRelationship}
      />
      {parentRelationship === 'married' && (
        <>
          <DatePicker
            width={50}
            label="Data de casamento"
            endDate={new Date()}
            {...register('weddingDate', { required: true })}
          />
          <CustomNumber
            name="priorChildren"
            label="Número de filhos anteriores a este casamento"
            min={0}
            max={20}
            required
            width={50}
            {...{ errors, register }}
          />
          <CustomNumber
            name="priorMiscarriages"
            label="Número de filhos anteriores a este casamento"
            min={0}
            max={20}
            width={50}
            required
            {...{ errors, register }}
          />
        </>
      )}
    </div>
  )
}
