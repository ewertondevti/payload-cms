'use client'

import React from 'react'
import { cn } from 'src/utilities/cn'
// import type { Post } from '@/payload-types'
import { Lifecycle } from '@/payload-types'
import { CardFrame } from '@ama-pt/agora-design-system'
export type Props = {
  posts: Lifecycle[]
}
export const MyCollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props
  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <CardFrame
                    className="frame-card"
                    label={result.name}
                    headingLevel="h2"
                    mainAnchor={{
                      children: 'Ver serviços', // props.linkTitle,
                      href: '/lifecycles/' + result.slug, // props.link,
                      // target: '_blank',
                      hasIcon: true,
                      trailingIcon: 'agora-line-arrow-right-circle',
                      trailingIconHover: 'agora-solid-arrow-right-circle',
                    }}
                  >
                    <p className="text-color">{result.content.title}</p>
                  </CardFrame>
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
