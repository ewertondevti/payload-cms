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

    watch,
    register,
  }

  return (
    <Width width={width}>
      <div className="grid xs:grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-x-32">
        <RadioButtons
          {...props}
          name="birthdate-or-year-registration"
          label="Sei a data exata de nascimento ou apenas o ano?"
          width={50}
          watch={watch}
          register={register}
        />

        {selectOption === '1' && (
          <DatePicker {...dateProps} {...register(props.name, { required })} width={50} />
        )}

        {!selectOption && (
          <Width width={50}>
            <InputNumber
              {...props}
              {...register('year-registration', { required })}
              label="Ano de nascimento"
              placeholder="Indique o ano de nascimento"
            />
          </Width>
        )}
      </div>
    </Width>
  )
}
