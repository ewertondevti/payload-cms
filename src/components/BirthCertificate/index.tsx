import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { BirthCertificateForm } from './BirthCertificateForm'

export async function BirthCertificate() {
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
        equals: 2,
      },
    },
  })

  const currForm = data?.docs?.[0]

  if (!currForm) return notFound()

  return <BirthCertificateForm form={currForm} />
}
