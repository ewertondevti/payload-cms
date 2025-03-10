import { DatePicker } from '@/components/DatePicker'
import { InputDateProps, InputNumber } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { RadioButtons, RadioButtonsProps } from '../RadioButtonGroup'
import { Width } from '../Width'

type Props = RadioButtonsProps &
  UseFormReturn & {
    errors: FieldErrors<FieldValues>
    radioLabel: string
    dateLabel: string
    yearLabel: string
  }

export const Birthdate: FC<Props> = ({ width, watch, register, required, ...props }) => {
  const selectOption = watch('birthdate-or-year-registration')

  const endDate = new Date()
  endDate.setDate(endDate.getDate() - 1)

  const getErrorMessage = () => {
    const error = props.errors['year-registration']

    switch (error?.type) {
      case 'required':
        return `Obrigatório preencher "${props.label}"`

      case 'min':
        return 'Ano mínimo 1900'

      case 'max':
        return 'Ano máximo é 2025'

      default:
        return
    }
  }

  return (
    <Width width={100}>
      <style>
        {`
          .agora-input-select-label {
            margin-bottom: 8px !important;
          }
        `}
      </style>

      <div className="flex gap-[32px]">
        <RadioButtons
          {...props}
          name="birthdate-or-year-registration"
          label={props.radioLabel}
          width={50}
          watch={watch}
          register={register}
          options={[
            { label: 'Data exata', value: 'exact-date' },
            { label: 'Ano', value: 'year' },
          ]}
        />

        {!!selectOption && <DatePicker {...register(props.name, { required })} width={50} />}

        {!selectOption && (
          <Width width={50}>
            <InputNumber
              {...props}
              {...register('year-registration', {
                required,
                min: 1900,
                max: new Date().getFullYear(),
              })}
              label={props.yearLabel}
              placeholder="Indique o ano de nascimento"
              feedbackState="danger"
              feedbackText={getErrorMessage()}
              hasError={!!props.errors['year-registration']}
            />
          </Width>
        )}
      </div>
    </Width>
  )
}
