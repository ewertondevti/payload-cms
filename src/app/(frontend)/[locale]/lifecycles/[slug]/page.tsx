import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { TypedLocale } from 'payload'
import { MyCollectionArchive } from '.'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'lifecycles',
    // draft: false,
    limit: 10,
    // overrideAccess: false,
  })

  const params = posts.docs.map(({ slug }) => {
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
}

export default async function Lifecycle({ params: paramsPromise }: Args) {
  const { id = '', slug = '', locale = 'en', title = '' } = await paramsPromise
  const url = '/lifecycles/' + slug
  const post = await queryPost({ slug, locale })
  const areas = await queryLifeCycleAreas({ id, slug, locale })

  //   if (!post) return <PayloadRedirects url={url} />

  return (
    <>
      <article className="pt-16 pb-16">
        {/* <PageClient /> */}

        {/* Allows redirects for valid pages too */}
        {/* <PayloadRedirects disableNotFound url={url} /> */}

        {/* <PostHero post={post} /> */}

        {/* <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container lg:mx-0 lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]"> */}
        {/* <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={post.content}
            enableGutter={false}
          /> */}

        <MyCollectionArchive posts={areas} />

        {/* </div> */}

        {/* {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )} */}

        {/* {post.relatedServices && post.relatedServices.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={post.relatedServices.filter((post) => typeof post === 'object')}
          />
        )} */}
        {/* </div> */}
      </article>
    </>
  )
}

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug = '', locale = 'en' } = await paramsPromise
//   const post = await queryPost({ slug, locale })

//   return generateMeta({ doc: post })
// }

const queryPost = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'lifecycles',
    // draft,
    limit: 1,
    // overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryLifeCycleAreas = cache(
  async ({ id, slug, locale }: { id: string; slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'areas',
      // draft,
      limit: 10,
      // overrideAccess: draft,
      locale,
      where: {
        'lifecycle.relatedLifeCycles.slug': {
          in: [slug],
        },
      },
    })

    return result.docs
  },
)
