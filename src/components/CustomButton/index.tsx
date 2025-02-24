'use client'
import { Button } from '@ama-pt/agora-design-system'
import Link from 'next/link'
interface Props {
  appearance: string
  variant: string
  label: string
  hasIcon: boolean
  trailingIcon: string
  trailingIconHover: string
  href: string
}
const CustomButton = (props: Props) => {
  return (
    <Link href={props.href}>
      <Button
        appearance={props.appearance}
        variant={props.variant}
        hasIcon={props.hasIcon}
        trailingIcon={props.trailingIcon}
        trailingIconHover={props.trailingIconHover}
        className='w-[263px]'
      >
        <Link href={props.href}>{props.label} </Link>
      </Button>
    </Link>
  )
}
export default CustomButton
