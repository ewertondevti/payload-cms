// import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
// "use client"
import type { Lifecycle, Post } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { TypedLocale } from 'payload'

import { LifeCycles } from '@/collections/LifeCycles'
import { CardFrame } from '@ama-pt/agora-design-system'
import { Card } from '@/components/Card'
import { MyCollectionArchive } from '.'
// import useClickableCard from '@/utilities/useClickableCard'

export interface LifeCycleListBlockProps {
  introContent?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  populateBy?: ('collection' | 'selection') | null
  relationTo?: 'lifecycles' | null
  //   categories?: (string | Category)[] | null;
  limit?: number | null
  //   selectedDocs?:
  //     | {
  //         relationTo: 'posts';
  //         value: string | typeof LifeCycles;
  //       }[]
  //     | null;
  id?: string | null
  blockName?: string | null
  blockType: 'archive'
}

export const LifeCycleList: React.FC<
  LifeCycleListBlockProps & {
    id?: string
    locale: TypedLocale
  }
> = async (props) => {
  const {
    id,
    // categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    // selectedDocs,
    locale,
  } = props

  //   const { card, link } = useClickableCard({})

  const limit = limitFromProps || 3

  let elementList: Lifecycle[] = []
  let posts: Post[] = []

//   if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    // const flattenedCategories = categories?.map((category) => {
    //   if (typeof category === 'object') return category.id
    //   else return category
    // })

    // const fetchedPosts = await payload.find({
    //   collection: 'posts',
    //   depth: 1,
    //   locale,
    //   limit,
    // //   ...(flattenedCategories && flattenedCategories.length > 0
    // //     ? {
    // //         where: {
    // //           categories: {
    // //             in: flattenedCategories,
    // //           },
    // //         },
    // //       }
    // //     : {}),
    // })

    const fetchedLifeCycles = await payload.find({
      collection: 'lifecycles',
      depth: 1,
      locale,
      limit,
      //   ...(flattenedCategories && flattenedCategories.length > 0
      //     ? {
      //         where: {
      //           categories: {
      //             in: flattenedCategories,
      //           },
      //         },
      //       }
      //     : {}),
    })

    // posts = fetchedPosts.docs
    elementList = fetchedLifeCycles.docs
//   }
  //   else {
  //     if (selectedDocs?.length) {
  //       const filteredSelectedPosts = selectedDocs.map((post) => {
  //         if (typeof post.value === 'object') return post.value
  //       }) as Post[]

  //       posts = filteredSelectedPosts
  //     }
  //   }

  //  console.log(elementList)

  return (
    // <div className="my-16" id={`block-${id}`}>
    <>
      <article className="pt-16 pb-16">
        {/* {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )} */}
        {/* <CollectionArchive posts={posts} /> */}

        {/* {elementList.map((element, index) => {
        return (
          <div className="col-span-4" key={index}>
            <CardFrame className="frame-card" title={element.name} headingLevel="h2" label={element.title} />
          </div>
        )})} */}

        <MyCollectionArchive posts={elementList} />
      </article>
    </>
    // </div>
  )
}
