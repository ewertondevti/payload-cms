import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { IdentificationForm } from './ApplicantIdentificationForm'

export async function ApplicantIdentification() {
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

 if (!currForm) return notFound()

 return <IdentificationForm form={currForm} />
}
