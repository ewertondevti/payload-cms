import { Width } from '@/blocks/Form/Width'
import { cn } from '@/utilities/cn'
import { InputDate, InputDateProps } from '@ama-pt/agora-design-system'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export const DatePicker: FC<Partial<InputDateProps> & UseFormRegisterReturn<string>> = ({
  width,
  darkMode,
  ...rest
}) => {
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
