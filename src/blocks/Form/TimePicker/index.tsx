import { InputTime, InputTimeProps } from '@ama-pt/agora-design-system'
import React from 'react'
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { Width } from '../Width'

export const TimePicker = ({ width, name, required, ...rest }: Partial<InputTimeProps>) => {
  const { register } = useFormContext()
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
    required,
    ...(name ? register(name, { required }) : {}),
    ...rest,
  }

  return (
    <Width width={width}>
      <InputTime {...props} />
    </Width>
  )
}
