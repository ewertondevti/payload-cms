import React from 'react'
import { CardFrame, CardSingle, Icon, Scribbles } from '@ama-pt/agora-design-system'
import './style.css'

const CardBasic = (props: any) => {
  const { title, description, link, linkText, icon = undefined } = props.props

  const cardArgs: any = {
    variant: 'default',
    title: title,
    headingLevel: 'h3',
    icon: {
      name: icon,
      dimensions: 'xl',
    },
    description: description,
    mainAnchor: {
      children: linkText,
      href: link,
      target: '_blank',
      hasIcon: true,
    },
  }
  return (
    <div className='basic-card'>
      <CardSingle {...cardArgs} />
    </div>
  )
}

export { CardBasic }
