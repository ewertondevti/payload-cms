
import { cn } from '@/utilities/cn'
import * as React from 'react'

export const Width: React.FC<{
  children?: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const containerClass = cn(className)

  return (
    <div
      className={containerClass}
      style={{ width: Number(width) < 100 ? `calc(${width}% - 16px)` : `${width}%` }}
    >
      {children}
    </div>
  )
}
