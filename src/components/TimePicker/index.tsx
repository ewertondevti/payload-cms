import { Width } from '@/blocks/Form/Width'
import { InputTime, InputTimeProps } from '@ama-pt/agora-design-system'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export const TimePicker = ({
  width,
  ...rest
}: Partial<InputTimeProps> & UseFormRegisterReturn<string>) => {
  const props = {
    clockIconAriaLabel: 'Open time picker overlay',

    minuteInputPlaceholder: 'mm',
    hourInputPlaceholder: 'hh',
    periodInputPlaceholder: 'aa',

    hasTimepickerMessage: true,

    cancelLabel: 'Cancel',
    cancelAriaLabel: 'Cancel selection',
    okLabel: 'Define',
    okAriaLabel: 'Confirm selection',
    timepickerMessageLabel: 'Use cursor keys to navigate',
    timepickerMessageAriaLabel: 'Helper message',
    ...rest,
  }

  return (
    <Width width={width}>
      <InputTime {...props} />
    </Width>
  )
}
