import React from 'react'
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Width } from '../Width'

export type AddressProps = UseFormReturn & {
  width: number
  apidomain: string
  required: boolean
  errors: FieldErrors<FieldValues>
}

export const Address: React.FC<AddressProps> = (props) => {
  return (
    <Width width={100}>
      <div className="flex flex-wrap gap-[32px]"></div>
    </Width>
  )
}
