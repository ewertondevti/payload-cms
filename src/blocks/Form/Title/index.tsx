import classNames from 'classnames'
import { FC } from 'react'

interface Props {
  label: string
}

export const Title: FC<Props> = ({ label }) => {
  const titleClasses = classNames(
    'title text-[20px] leading-[32px] font-bold',
    'text-[var(--color-primary-900)]',
    'w-full my-[32px]',
  )

  return <h2 className={titleClasses}>{label}</h2>
}
