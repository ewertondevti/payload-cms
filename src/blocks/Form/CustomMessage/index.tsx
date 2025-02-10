import React from 'react'
import RichText from '@/components/RichText'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'customMessage' }>

export const CustomMessage: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { richText } = props

  return <>{richText && <RichText content={richText} enableGutter={false} />}</>
}
