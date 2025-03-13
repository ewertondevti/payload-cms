import React, { FC, useState } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { CustomNumber } from '../../CustomNumber'
import { Select } from '@/blocks/Form/Select'

type TwinBirthDataProps = { name: string }

export const TwinBirthData: FC<
  TwinBirthDataProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ register, errors, ...props }) => {
  const [typeOfBirth, setTypeOfBirth] = useState<string>()

  return (
    <>
      <Select
        name="typeOfBirth"
        label="Número de nascimentos"
        placeholder="Selecione uma opção"
        width={50}
        options={[
          { label: 'Simples', value: 'simple' },
          { label: 'Gemelar', value: 'twin' },
        ]}
        required
        onChange={setTypeOfBirth}
      />
      {typeOfBirth === 'twin' && (
        <>
          <CustomNumber
            name="twinCount"
            label="Número de gémeos"
            width={50}
            min={2}
            max={9}
            required
            {...{ errors, register }}
          />
          <Select
            name="currentTwin"
            label="A presente declaração respeita ao"
            placeholder="Selecione uma opção"
            width={50}
            required
            options={[
              { label: '1º gémeo', value: 'first' },
              { label: '2º gémeo', value: 'second' },
              { label: '3º gémeo', value: 'third' },
              { label: 'Outro gémeo', value: 'other' },
            ]}
          />
          <CustomNumber
            name="livingTwins"
            label="Nº de gémeos nascidos com vida neste parto"
            min={1}
            max={9}
            width={50}
            required
            {...{ errors, register }}
          />
          <CustomNumber
            name="miscarriedTwins"
            label="Nº de fetos mortos neste parto"
            min={0}
            max={8}
            width={50}
            required
            {...{ errors, register }}
          />
        </>
      )}
    </>
  )
}
