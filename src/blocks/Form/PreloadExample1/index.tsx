
export interface PreLoadExample1Field {
  blockName?: string
  blockType: 'preloadexample1',
  simulatePreload: boolean,
//   lockFieldsAfterPreload: boolean
}

import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { InputText } from '@ama-pt/agora-design-system'
import { Nif } from '../Nif'

// generate a random number with 9 digits
const randomNif = () => {
  return Math.floor(100000000 + Math.random() * 900000000).toString()
}

export const PreLoadExample1: React.FC<
    PreLoadExample1Field & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ 
    // name, defaultValue, 
    errors, 
    simulatePreload,
    // lockFieldsAfterPreload,
    // label, 
    register
    // , required: requiredFromProps, width
}) => {

    const preloadedValueNif = "123456789" // randomNif()
    const preloadedValueNome = "" // "Nome completo do NIF " + preloadedValueNif

  return (
    <>
        <Nif 
            errors={errors}
            register={register}
            blockType={'nif'}
            name={'requerenteNif'}
            required={true}
            defaultValue={ simulatePreload ? preloadedValueNif : ''}
            label={'Nif do Requerente'}
            // disabled={simulatePreload && lockFieldsAfterPreload}
        />
        <br />
        <InputText 
            id={'requerenteNome'} 
            label={'Nome do Requerente'}
            type="text"
            defaultValue={ simulatePreload ? preloadedValueNome : '' }
            hasFeedback={true}
            maxLength={250}
            hasError={errors['requerenteNome'] ? true : false}
            feedbackText={errors['requerenteNome']?.message?.toString()}
            required={true}
            // disabled={simulatePreload && lockFieldsAfterPreload}
            {...register('requerenteNome', { required: 'Campo de preenchimento obrigatório.' })}
        />
    </>
  )
}
