import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react';
import { NoAuthForm } from './noAuthForm/intex';



export async function NoAuthPayload() {
 const payload = await getPayload({
  config: configPromise,
 })

 const data = await payload.find({
  collection: 'forms',
  draft: false,
  limit: 1,
  overrideAccess: false,
  where: {
   id: {
    equals: 1,
   },
  },
 })


 const currForm = data?.docs?.[0]
 console.log("Dados do formulário selecionado:", currForm)

 if (!currForm) return notFound()

 return <NoAuthForm form={currForm} />
}
