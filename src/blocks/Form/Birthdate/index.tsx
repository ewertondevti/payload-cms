import { DatePicker } from '@/components/DatePicker'
import { InputDateProps, InputNumber } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { RadioButtons, RadioButtonsProps } from '../RadioButtonGroup'
import { Width } from '../Width'

export const Birthdate: FC<
  RadioButtonsProps & UseFormReturn & { errors: FieldErrors<FieldValues> }
> = ({ width, watch, register, required, ...props }) => {
  const selectOption = watch('birthdate-or-year-registration')

  const endDate = new Date()
  endDate.setDate(endDate.getDate() - 1)

  const dateProps: InputDateProps & UseFormReturn = {
    ...props,

    calendarIconAriaLabel: 'Open calendar picker overlay',
    previousYearAriaLabel: 'Navigate previous year',
    previousMonthAriaLabel: 'Navigate previous month',
    nextMonthAriaLabel: 'Navigate next month',
    nextYearAriaLabel: 'Navigate next year',

    todayDayAriaLabel: 'Today',
    focusedDayAriaLabel: 'focused',
    selectedDayAriaLabel: 'selected',

    todayLabel: 'Today',
    cancelLabel: 'Cancel',
    okLabel: 'OK',
    todayAriaLabel: 'Navigate to today',
    cancelAriaLabel: 'Cancel selection',
    okAriaLabel: 'Select focused day',

    dayInputPlaceholder: 'dd',
    monthInputPlaceholder: 'mm',
    yearInputPlaceholder: 'yyyy',

    feedbackState: 'danger',
    feedbackText: `Obrigatório preencher "${props.label}"`,
    hasError: !!props.errors[props.name],

    endDate,

    watch,
    register,
  }

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
      <div className="flex gap-[32px]">
        <RadioButtons
          {...props}
          name="birthdate-or-year-registration"
          label="Sei a data exata de nascimento ou apenas o ano?"
          width={50}
          watch={watch}
          register={register}
          options={[
            { label: 'Data exata', value: 'exact-date' },
            { label: 'Ano', value: 'year' },
          ]}
        />

        {!!selectOption && (
          <DatePicker {...dateProps} {...register(props.name, { required })} width={50} />
        )}

        {!selectOption && (
          <Width width={50}>
            <InputNumber
              {...props}
              {...register('year-registration', {
                required,
                min: 1900,
                max: new Date().getFullYear(),
              })}
              label="Ano de nascimento"
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
