import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Area } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { TypedLocale } from 'payload'
import { CardFrame } from '@ama-pt/agora-design-system'
import { MyCollectionArchive } from '.'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'areas',
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

export default async function Area({ params: paramsPromise }: Args) {
  const { id = '', slug = '', locale = 'en', title = '' } = await paramsPromise
  const url = '/areas/' + slug
  const post = await queryPost({ slug, locale })
  const services = await queryRelatedServices({ id, slug, locale })

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

        <MyCollectionArchive posts={services} />

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
    collection: 'areas',
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

const queryRelatedServices = cache(
  async ({ id, slug, locale }: { id: string; slug: string; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'services',
      // draft,
      limit: 10,
      // overrideAccess: draft,
      locale,
      where: {
        'area.slug': {
            in: [slug],
        }
    },
    })

    return result.docs
  },
)
