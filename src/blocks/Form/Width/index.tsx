import classNames from 'classnames'
import * as React from 'react'

export const Width: React.FC<{
  children?: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const containerClass = classNames(className)

  return (
    <div
      className={containerClass}
      style={{ width: Number(width) < 100 ? `calc(${width}% - 16px)` : `${width}%` }}
    >
      {children}
    </div>
  )
}
