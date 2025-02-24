import classNames from 'classnames'
import { ElementType, FC } from 'react'

interface Props {
  label: string
  level?: 1 | 2 | 3 | 4 | 5
  className?: string
}

export const Title: FC<Props> = ({ label, level = 1, className }) => {
  const titleClasses = classNames(
    'title text-[20px] leading-[32px] font-bold',
    'text-[var(--color-primary-900)]',
    `w-full my-[32px]`,
    className,
  )

  const Component: ElementType = `h${level}`

  return <Component className={titleClasses}>{label}</Component>
}
