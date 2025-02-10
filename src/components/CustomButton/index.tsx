'use client'
import { Button } from '@ama-pt/agora-design-system'
import { useRouter } from 'next/navigation'
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
      >
        <Link href={props.href}>{props.label} </Link>
      </Button>
    </Link>
  )
}
export default CustomButton
