import React, { useState, useEffect } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { Width } from '../Width'
import { RadioButton, RadioButtonGroup } from '@ama-pt/agora-design-system'

export interface RequestorDataProps {
  name: string,
  label: string
}

export const RequestorData: React.FC<
  RequestorDataProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, label, register }) => {
  const { setValue } = useFormContext()
  const [selectedValue, setSelectedValue] = useState<string | undefined>('proprio')

  useEffect(() => {
    register(name, { value: selectedValue })
  }, [])

  return (
    <div className='flex flex-col gap-8'>
      <h2 className='font-bold text-xl text-[#021C51]'>{label}</h2>
      <Width width={50} className='flex flex-col gap-8'>
        <RadioButtonGroup
          id='cvtRequerente'
          legend="A quem se destina o pedido em curso?"
          onChange={(e) => {
            setSelectedValue(e.target.value)
            setValue(name, e.target.value)
          }}
        >
          <RadioButton
            label="Para mim"
            value="proprio"
            key="proprio"
            checked={selectedValue === "proprio"}
          />
          <RadioButton
            label="Represento outra pessoa"
            value="representante"
            key="representante"
            checked={selectedValue === "representante"}
          />
        </RadioButtonGroup>
        {selectedValue === 'proprio' ? (<></>) : (
          <RadioButtonGroup
            id='cvtLegitimidade'
            legend="Legitimidade da representação"
            onChange={(e) => {
              setSelectedValue(e.target.value)
              setValue(name, e.target.value)
            }}
          >
            <RadioButton
              label="Sujeito da obrigação de registar"
              value="sujeitoObrigacao"
              key="sujeitoObrigacao"
              checked={selectedValue === "sujeitoObrigacao"}
            />
            <RadioButton
              label="Representante com procuração"
              value="comProcuracao"
              key="comProcuracao"
              checked={selectedValue === "comProcuracao"}
            />
            <RadioButton
              label="Representante sem procuração"
              value="semProcuracao"
              key="semProcuracao"
              checked={selectedValue === "semProcuracao"}
            />
          </RadioButtonGroup>
        )}

      </Width>
    </div>
  )
}
