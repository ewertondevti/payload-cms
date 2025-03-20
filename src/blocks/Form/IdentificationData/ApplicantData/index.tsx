import { FC } from 'react'
import { IdentificationDataProps } from '..'
import { Nif, NifProps } from '../../Nif'
import { Select, SelectProps } from '../../Select'
import { TextBox, TextBoxProps } from '../../TextBox'


export const ApplicantData: FC<IdentificationDataProps> = (props) => {
  const docTypeProps: SelectProps = {
    ...props,
    name: 'document-type',
    label: 'Documento de identificação',
    placeholder: 'Indique o documento de identificação',
    width: 50,
    options: [
      { label: 'Cartão Cidadão', value: 'cc' },
      { label: 'Passaporte', value: 'passaporte' },
      { label: 'Outro', value: 'other' },
    ],
    required: true,
    defaultValue: 'cc',
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
    required: props.isVerificationDigitRequired,
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
    <div className="flex flex-wrap gap-[32px]">
      <TextBox {...fullnameProps} />
      <Select {...docTypeProps} />
      <TextBox {...docNumberProps} />
      {props.isVerificationDigitVisible && <TextBox {...digVerificationProps} />}
      {props.nifIsVisible && <Nif {...nifProps} />}
    </div>
  )
}
