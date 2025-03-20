import React from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { ParentAddress } from './ParentAddress'
import { IdentificationAddress } from './IdentificationAddress'

import WeddingAddress from './WeddingAddress'
import PlaceDate from './PlaceDate'
import WeddingPlaceAddress from './WeddingPlaceAddress'
import { Title } from '../Title'

export type AddressProps = UseFormReturn & {
  name: string
  errors: FieldErrors<FieldValues>
  title: string
  identificationType:
  | 'identification-data'
  | 'parent-data'
  | 'place-date'
  | 'wedding-data'
  | 'wedding-place-data'
}

export const AddressData: React.FC<AddressProps> = (props) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <Title label={props.title} htmlTag="h2" />
      {props.identificationType === 'identification-data' && <ParentAddress {...props} />}
      {props.identificationType === 'parent-data' && <IdentificationAddress {...props} />}
      {props.identificationType === 'place-date' && <PlaceDate {...props} />}
      {props.identificationType === 'wedding-data' && <WeddingAddress {...props} />}
      {props.identificationType === 'wedding-place-data' && <WeddingPlaceAddress {...props} />}
    </div>
  )
}
