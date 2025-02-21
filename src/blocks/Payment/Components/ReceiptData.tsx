'use client'
import React, { useEffect, useState } from 'react'
import { RadioButton } from '@ama-pt/agora-design-system'
import { RadioButtonGroup, InputText } from '@ama-pt/agora-design-system'
import { Nif } from '@/blocks/Form/Nif'
import { AddressData } from '@/blocks/Form/AddressData'
import { UseFormRegister, FieldValues, FieldErrorsImpl, UseFormSetValue } from 'react-hook-form'

interface ReceiptDataProps {
  receiptOptions: { name: string; address: string }[]
  register: UseFormRegister<FieldValues>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
  setValue: UseFormSetValue<FieldValues>
}

const ReceiptData = ({ receiptOptions, register, errors, setValue }: ReceiptDataProps) => {
  const [options, setOptions] = useState<{ name: string; address: string }[]>([])
  const [receiptOption, setReceiptOption] = useState<{ name: string; address: string } | null>(null)

  useEffect(() => {
    if (receiptOptions.length > 0) {
      const updatedOptions = [...receiptOptions, { name: 'Outro', address: '' }]
      setOptions(updatedOptions)
      setReceiptOption(updatedOptions[0]) // Agora espera pelos dados antes de definir o estado inicial
    }
  }, [receiptOptions]) // Atualiza somente quando `receiptOptions` mudar

  useEffect(() => {
    if (receiptOption) {
      register('requerente', { value: receiptOption })
    }
  }, [receiptOption])

  const handleRadioButtonChange = (value: { name: string; address: string }) => {
    setReceiptOption(value)
    setValue('requerente', value)
  }

  return (
    <div className="flex flex-col gap-16">
      <h2 className="font-semibold text-[20px] leading-[32px] text-[#021C51]">
        Dados para emissão do recibo
      </h2>
      {options.length > 0 ? (
        <>
          <RadioButtonGroup
            onChange={(e) =>
              handleRadioButtonChange(options.find((option) => option.name === e.target.value)!)
            }
          >
            {options.map((option, index) => (
              <RadioButton
                key={index}
                value={option.name}
                label={option.name}
                checked={receiptOption?.name === option.name}
              >
                <b>{option.name}</b> {option.address}
              </RadioButton>
            ))}
          </RadioButtonGroup>
          {receiptOption?.name === 'Outro' && (
            <>
              <div className="flex flex-col gap-8">
                <InputText
                  id="cvtNome"
                  required
                  label="Nome Completo"
                  placeholder="Indique o nome completo"
                  hasFeedback
                  hasError={errors.cvtNome ? true : false}
                  feedbackState="danger"
                  feedbackText={errors.cvtNome?.message?.toString()}
                  {...register('cvtNome', {
                    required: 'Campo de preenchimento obrigatório',
                    pattern: {
                      value: /^[A-Za-zÀ-ú]+\s[A-Za-zÀ-ú]+(\s[A-Za-zÀ-ú]+)*$/,
                      message: 'Nome inválido',
                    },
                  })}
                />
                <div className="flex flex-row gap-8 justify-between">
                  <div className="w-full">
                    <Nif
                      id="cvtNIF"
                      name="cvtNIF"
                      label="NIF"
                      blockType="nif"
                      placeholder="Indique o NIF"
                      required
                      errors={errors}
                      register={register}
                    />
                  </div>
                  <div className="w-full">
                    <InputText
                      id="email"
                      required
                      label="E-mail"
                      placeholder="Indique o e-mail"
                      hasFeedback
                      hasError={errors.email ? true : false}
                      feedbackState="danger"
                      feedbackText={errors.email?.message?.toString()}
                      {...register('email', {
                        required: 'Campo de preenchimento obrigatório',
                        pattern: {
                          value: /^\S[^\s@]*@\S+$/,
                          message: 'E-mail inválido',
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <div>
                <AddressData name="morada" errors={errors} register={register} />
              </div>
            </>
          )}
        </>
      ) : (
        <p>Carregando opções...</p> // Mensagem temporária até os dados chegarem
      )}
    </div>
  )
}

export default ReceiptData
