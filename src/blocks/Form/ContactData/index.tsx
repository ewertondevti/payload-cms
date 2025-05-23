import React, { useState, useEffect } from 'react'
import type {
  FieldErrorsImpl,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { InputText } from '@ama-pt/agora-design-system'
import { InputPhone } from '@ama-pt/agora-design-system'

export interface ContactDataProps {
  name: string
  defaults?: {
    email?: string
    phoneNumber?: string
  }
}

export const ContactData: React.FC<
  ContactDataProps & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaults, errors, register }) => {
  return (
    <div className="flex flex-col gap-64">
      <h2 className="font-bold text-xl text-[#021C51]">Dados de contacto</h2>
      <InputText
        id="cvtEmail"
        label="E-mail"
        placeholder="Indique o nome e-mail"
        hasError={errors.email ? true : false}
        feedbackState={'danger'}
        feedbackText={errors.email?.message?.toString()}
        defaultValue={defaults?.email}
        {...register('cvtEmail', {
          required: 'Campo de preenchimento obrigatório',
          pattern: {
            value: /^\S[^\s@]*@\S+$/,
            message: 'E-mail inválido',
          },
        })}
      />
      <InputPhone
        id="cvtTelefone"
        label="Número do contacto telefónico"
        placeholder="(+351) 00 000 000"
        hasError={errors.cvtTelefone ? true : false}
        feedbackState={'danger'}
        feedbackText={errors.cvtTelefone?.message?.toString()}
        defaultValue={defaults?.phoneNumber}
        {...register('cvtTelefone', {
          required: 'Campo de preenchimento obrigatório',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Número de contacto inválido',
          },
        })}
      />
    </div>
  )
}
