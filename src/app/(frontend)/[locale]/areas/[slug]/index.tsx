'use client'
import { cn } from 'src/utilities/cn'
import React from 'react'

// import type { Post } from '@/payload-types'

// import { Card } from '@/components/Card'
// import { LifeCycleListBlockProps } from './Component'
import { Service } from '@/payload-types'
import { CardFrame, CardTopic } from '@ama-pt/agora-design-system'

export type Props = {
  posts: Service[]
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
                  <CardTopic
                    className="frame-card"
                    title={result.name}
                    headingLevel="h2"
                    mainAnchor={{
                      children: 'Ir para serviço', // props.linkTitle,
                      href: '/services/details/' + result.id, // props.link,
                      // target: '_blank',
                      hasIcon: true,
                      trailingIcon: 'agora-line-arrow-right-circle',
                      trailingIconHover: 'agora-solid-arrow-right-circle',
                    }}
                  >
                    <p className="text-color">{result.name}</p>
                  </CardTopic>
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
