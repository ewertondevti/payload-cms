import { cn } from '@/utilities/cn'
import { InputDate, InputDateProps } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import dayjs, { ManipulateType } from 'dayjs'
import { Width } from '../Address/Width'


type DateSpecification = {
  length: number
  typeOfLength: ManipulateType
  beforeOrAfter: string
}

type DatePickerProps = {
  relativeMinDate?: DateSpecification
  relativeMaxDate?: DateSpecification
}

const getDate = ({ length, typeOfLength, beforeOrAfter }: DateSpecification) => {
  if (beforeOrAfter === 'before') return dayjs().subtract(length, typeOfLength).toDate()
  else if (beforeOrAfter === 'after') return dayjs().add(length, typeOfLength).toDate()
  return undefined
}
export const DatePicker: FC<
  DatePickerProps & Partial<InputDateProps> & UseFormRegisterReturn<string>
> = ({ relativeMinDate, relativeMaxDate, width, darkMode, ...rest }) => {
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
