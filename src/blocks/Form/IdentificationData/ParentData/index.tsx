import { FC } from 'react'
import { DatePicker } from '@/blocks/Form/DatePicker'
import { InputText } from '@ama-pt/agora-design-system'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { Width } from '../../Width'
import { Select } from '../../Select'
import { joinName } from '@/utilities/joinName'

export interface ParentDataProps {
  name?: string
}

const options = {
  identification: [
    { label: 'Cartão de Cidadão', value: 'cc' },
    { label: 'Passaporte', value: 'passport' },
    { label: 'Outro', value: 'other' },
  ],
  gender: [
    { label: 'Feminino', value: 'female' },
    { label: 'Masculino', value: 'male' },
    { label: 'Outro', value: 'other' },
  ],
  maritalStatus: [
    { label: 'Solteiro(a)', value: 'single' },
    { label: 'Casado(a)', value: 'married' },
    { label: 'Divorciado(a)', value: 'divorced' },
    { label: 'Viúvo(a)', value: 'widowed' },
  ],
  nationality: [
    { label: 'Portugal', value: 'PT' },
    { label: 'Brasil', value: 'BR' },
    { label: 'Outro', value: 'other' },
  ],
}

export const ParentData: FC<ParentDataProps> = ({
  register,
  name,
  errors,
}: ParentDataProps & {
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
}) => {
  const getError = (field: string) =>
    errors?.[field]?.type === 'required' ? 'Obrigatório preencher este campo.' : ''

  return (
    <div className="flex flex-col gap-32">
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <InputText
            label="Nome(s) próprio(s)"
            placeholder="Mariana"
            required
            hasError={!!errors?.firstName}
            feedbackText={getError('firstName')}
            feedbackState="danger"
            {...register('firstName', { required: true })}
          />
        </Width>
        <Width width={50}>
          <InputText
            label="Apelido(s)"
            placeholder="Lopes"
            required
            hasError={!!errors?.lastName}
            feedbackText={getError('lastName')}
            feedbackState="danger"
            {...register('lastName', { required: true })}
          />
        </Width>
      </div>

      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <Select
            label="Documento de Identificação"
            placeholder="Cartão de cidadão"
            options={options.identification}
            hasError={!!errors?.documentType}
            name={joinName(name || '', 'documentType')}
          />
        </Width>
        <Width width={50}>
          <input
            type="text"
            style={{ opacity: 0, pointerEvents: 'none', width: '100%', height: '40px' }}
            disabled
            aria-hidden="true"
          />
        </Width>

        <Width width={50}>
          <InputText
            label="Número do documento"
            placeholder="34567890 ZE"
            required
            hasError={!!errors?.documentNumber}
            feedbackText={getError(joinName(name || '', 'documentNumber'))}
            feedbackState="danger"
            {...register(joinName(name || '', 'documentNumber'))}
          />
        </Width>
        <Width width={50}>
          <InputText
            label="Dígito de verificação"
            placeholder="1"
            required
            hasError={!!errors?.verificationDigit}
            feedbackText={getError(joinName(name || '', 'verificationDigit'))}
            feedbackState="danger"
            {...register(joinName(name || '', 'verificationDigit'))}
          />
        </Width>
      </div>
      <div className="flex gap-32 flex-wrap">
        <Width width={50}>
          <Select
            label="Gênero"
            placeholder="Feminino"
            options={options.gender}
            hasError={!!errors?.gender}
            name="gender"
          />
        </Width>
        <Width width={50}>
          <Select
            label="Estado civil"
            placeholder="Solteiro(a)"
            options={options.maritalStatus}
            hasError={!!errors?.maritalStatus}
            name="maritalStatus"
          />
        </Width>
      </div>

      <div className="flex gap-32 flex-wrap">
        <DatePicker
          label="Data de nascimento"
          required
          {...register('birthDate')}
          width={50}
        />
        <Width width={50}>
          <Select
            label="País de nacionalidade"
            placeholder="Portugal"
            options={options.nationality}
            hasError={!!errors?.nationality}
            name="nationality"
          />
        </Width>
      </div>
    </div>
  )
}
