import classNames from 'classnames'
import { ElementType, FC } from 'react'

interface Props {
  label: string
  sublabel?: string
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  className?: string
}

export const Title: FC<Props> = ({ label, sublabel, htmlTag = 'h1', className }) => {
  const getTagStyles = () => {
    switch (htmlTag) {
      case 'h1':
        return 'text-[32px] leading-[48px]'

      default:
        return 'text-[20px] leading-[32px]'
    }
  }

  const titleClasses = classNames(
    'title font-bold',
    'text-[var(--color-primary-900)]',
    `w-full`,
    getTagStyles(),
    className,
  )

  const Component: ElementType = htmlTag

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <Component className={titleClasses}>{label}</Component>

      {!!sublabel && <span className="text-[16px] leading-[28px]">{sublabel}</span>}
    </div>
  )
}
