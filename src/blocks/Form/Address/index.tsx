import React from 'react'
import { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form'
import { Title } from '../Title'
import { ParentAddress } from './ParentAddress'
import { IdentificationAddress } from './IdentificationAddress'

import WeddingAddress from './WeddingAddress'
import PlaceDate from './PlaceDate'

export type AddressProps = UseFormReturn & {
 errors: FieldErrors<FieldValues>
 title: string
 identificationType: 'identification-data' | 'parent-data' | 'place-date' | 'wedding-data'
}

export const AddressData: React.FC<AddressProps> = (props) => {
 console.log(props)
 return (
  <div className="flex flex-col gap-[32px]">
   <Title label={props.title} htmlTag="h2" />
   {props.identificationType === 'identification-data' && <ParentAddress {...props} />}
   {props.identificationType === 'parent-data' && <IdentificationAddress {...props} />}
   {props.identificationType === 'place-date' && <PlaceDate {...props} />}
   {props.identificationType === 'wedding-data' && <WeddingAddress {...props} />}
  </div>
 )
}
