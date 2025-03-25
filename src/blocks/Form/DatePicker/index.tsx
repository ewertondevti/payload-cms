import { Width } from '@/blocks/Form/Width'
import { cn } from '@/utilities/cn'
import { InputDate, InputDateProps } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import dayjs, { ManipulateType } from 'dayjs'

type RelativeDateSpecification = {
  length: number
  typeOfLength: ManipulateType
  beforeOrAfter: 'before' | 'after'
}

type DatePickerProps = {
  relativeMinDate?: RelativeDateSpecification
  relativeMaxDate?: RelativeDateSpecification
}

export const relativeDate = (
  length: number,
  typeOfLength: ManipulateType,
  beforeOrAfter: 'before' | 'after',
): RelativeDateSpecification => ({
  length,
  typeOfLength,
  beforeOrAfter,
})

const getDate = ({ length, typeOfLength, beforeOrAfter }: RelativeDateSpecification) => {
  if (beforeOrAfter === 'before') return dayjs().subtract(length, typeOfLength).toDate()
  else if (beforeOrAfter === 'after') return dayjs().add(length, typeOfLength).toDate()
  return undefined
}
export const DatePicker: FC<DatePickerProps & Partial<InputDateProps>> = ({
  relativeMinDate,
  relativeMaxDate,
  width,
  darkMode,
  name,
  required,
  ...rest
}) => {
  const { register } = useFormContext()
  const containerClassNames = cn({
    'bg-primary-900 text-white': darkMode,
  })

  const compProps: InputDateProps = {
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

    startDate: relativeMinDate && getDate(relativeMinDate),
    endDate: relativeMaxDate && getDate(relativeMaxDate),
    required,
    ...(name ? register(name, { required }) : {}),
    ...rest,
  }

  return (
    <Width width={width}>
      <div className={containerClassNames}>
        <InputDate {...compProps} />
      </div>
    </Width>
  )
}
