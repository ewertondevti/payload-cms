'use client'
import { CardHeroIndex } from '@ama-pt/agora-design-system'

interface Props {
  title: string
  index: []
}
const CardHero = (props: Props) => {
  return <CardHeroIndex index={props.index} title={props.title} headingLevel="h2" />
}
export default CardHero
