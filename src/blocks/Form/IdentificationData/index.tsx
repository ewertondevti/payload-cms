import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Nif, NifProps } from '../Nif'
import { Select, SelectProps } from '../Select'
import { TextBox, TextBoxProps } from '../TextBox'
import { Title } from '../Title'

export type IdentificationDataProps = UseFormReturn & {
  errors: FieldErrors<FieldValues>
  nifIsRequired: boolean
  nifIsVisible: boolean
  title: string
}

export const IdentificationData: FC<IdentificationDataProps> = (props) => {
  const docTypeProps: SelectProps = {
    ...props,
    name: 'document-type',
    label: 'Documento de identificação',
    placeholder: 'Indique o documento de identificação',
    width: 50,
    options: [
      { label: 'Cartão Cidadão', value: 'cartao-cidadao' },
      { label: 'Passaporte', value: 'passaporte' },
      { label: 'Título de Residência', value: 'titulo-residencia' },
    ],
    required: true,
    defaultValue: 'cartao-cidadao',
  }

  const fullnameProps: TextBoxProps = {
    ...props,
    name: 'fullname',
    label: 'Nome completo',
    placeholder: 'Indique o nome completo',
    width: 100,
    maxLength: 255,
    pattern: /[a-zA-Z]+\s[a-zA-Z]+/g,
    required: true,
  }

  const docNumberProps: TextBoxProps = {
    ...props,
    name: 'document-number',
    label: 'Número do documento',
    placeholder: 'Indique o número do documento',
    width: 50,
    minLength: 6,
    maxLength: 8,
    required: true,
  }

  const digVerificationProps: TextBoxProps = {
    ...props,
    name: 'digit-verification',
    label: 'Dígito de verificação',
    placeholder: 'Indique o dígito de verificação',
    width: 50,
    maxLength: 1,
  }

  const nifProps: NifProps = {
    ...props,
    name: 'nif',
    label: 'Número de Identificação Fiscal (NIF)',
    placeholder: 'Indique o NIF',
    width: 50,
    required: props.nifIsRequired,
  }

  return (
    <div className="flex flex-col gap-[32px]">
      <style>
        {`
          .agora-input-select-label {
            margin-bottom: 8px !important;
          }

          .input-label-wrapper {
            margin-bottom: 8px !important;
          }
        `}
      </style>

      <Title label="Dados de identificação" htmlTag="h2" />

      <div className="flex flex-wrap gap-[32px]">
        <TextBox {...fullnameProps} />
        <Select {...docTypeProps} />
        <TextBox {...docNumberProps} />
        {!props.nifIsVisible && <TextBox {...digVerificationProps} />}
        {props.nifIsVisible && <Nif {...nifProps} />}
      </div>
    </div>
  )
}
