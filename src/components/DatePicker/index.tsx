import { InputDate, InputDateProps } from '@ama-pt/agora-design-system'
import classNames from 'classnames'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'

export const DatePicker: FC<InputDateProps & UseFormReturn> = ({ setValue, width, ...props }) => {
  const xlSpanCol = width ? (width === 100 ? 12 : 6) : 12

  const containerClassNames = classNames(`xs:col-span-4 md:col-span-6 xl:col-span-${xlSpanCol}`, {
    'bg-primary-900 text-white': props.darkMode,
  })

  const compProps: InputDateProps = {
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

    onChange: (e) => setValue(props.name!, e.target.value),
  }

  return (
    <div className={containerClassNames}>
      <InputDate {...compProps} />
    </div>
  )
}
