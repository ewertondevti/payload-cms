import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import ServiceStep from '.'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'services',
    // draft: false,
    limit: 10,
    // overrideAccess: false,
  })

  const params = posts.docs.map(({ slug }: any) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    id?: string
    title?: string
    slug?: string
    locale?: TypedLocale
  }>
  // , serviceId: string
}

export default async function ServiceStepPage({ params: paramsPromise }: Args) {
  // const { id, locale } = await paramsPromise

  return (
    <>
      <PageClient />
      <div className="container w-fit mt-16 mb-16">
        <ServiceStep params={paramsPromise} />
      </div>
    </>
  )
}
