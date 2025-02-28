import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Nif, NifProps } from '../Nif'
import { Text, TextProps } from '../Text'
import { Title } from '../Title'
import { InputSelect, InputSelectProps } from '@/components/ui/inputSelect'

export type IdentificationDataProps = UseFormReturn & {
  errors: FieldErrors<FieldValues>
  nifIsRequired: boolean
  nifIsVisible: boolean
}

export const IdentificationData: FC<IdentificationDataProps> = (props) => {
  const docTypeProps: InputSelectProps = {
    ...props,
    id: 'document-type',
    label: 'Documento de identificação',
    placeholder: 'Indique o documento de identificação',
    hideSectionNames: true,
    options: [
      { label: 'Cartão Cidadão', value: 'cartao-cidadao' },
      { label: 'Passaporte', value: 'passaporte' },
      { label: 'Título de Residência', value: 'titulo-residencia' },
    ],
    required: false
  }

  const fullnameProps: TextProps = {
    ...props,
    name: 'fullname',
    label: 'Nome completo',
    placeholder: 'Indique o nome completo',
    width: 100,
    maxLength: 255,
    pattern: /[a-zA-Z]+\s[a-zA-Z]+/g,
  }

  const docNumberProps: TextProps = {
    ...props,
    name: 'document-number',
    label: 'Número do documento',
    placeholder: 'Indique o número do documento',
    width: 50,
    minLength: 6,
    maxLength: 8,
  }

  const digVerificationProps: TextProps = {
    ...props,
    name: 'digit-verification',
    label: 'Dígito de verificação',
    placeholder: 'Indique o dígito de verificação',
    width: 50,
    maxLength: 1,
  }

  const nifLabel = props.nifIsRequired ? (
    'Nif'
  ) : (
    <div className="flex flex-wrap gap-[8px]">
      <label className="input-text-label">
        Nif <span className="text-[#64718B]">(Optional)</span>
      </label>
    </div>
  )

  const nifProps: NifProps = {
    ...props,
    name: 'nif',
    label: nifLabel,
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

      <Title label="Dados de identificação" />

      <div className="flex flex-wrap gap-[32px]">
        <Text {...fullnameProps} />
        <InputSelect {...docTypeProps} />
        <Text {...docNumberProps} />
        {!props.nifIsVisible && <Text {...digVerificationProps} />}
        {props.nifIsVisible && <Nif {...nifProps} />}
      </div>
    </div>
  )
}
