import { DatePicker } from '@/components/DatePicker'
import { InputNumber } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { FlexRadioButtonGroup, FlexRadioButtonGroupProps } from '../Cidadao/FlexRadioButtonGroup'

type Props = FlexRadioButtonGroupProps &
  UseFormReturn & {
    errors: FieldErrors<FieldValues>
    radioLabel: string
    dateLabel: string
    yearLabel: string
    yearPlaceholder: string
  }

export const DateOrYearPicker: FC<Props> = ({ watch, register, required, ...props }) => {
  const selectOption = watch('date-or-year-registration')

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
    <div className="w-full">
      <div className="flex gap-[32px]">
        <FlexRadioButtonGroup
          {...props}
          name="date-or-year-registration"
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
          <div className="w-[calc(50% - 16px)]">
            <InputNumber
              {...props}
              {...register('year-registration', {
                required,
                min: 1900,
                max: new Date().getFullYear(),
              })}
              label={props.yearLabel}
              placeholder={props.yearPlaceholder}
              feedbackState="danger"
              feedbackText={getErrorMessage()}
              hasError={!!props.errors['year-registration']}
            />
          </div>
        )}
      </div>
    </div>
  )
}
