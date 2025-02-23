import { HTMLHeadingElementProps } from '@/types/globals'
import React from 'react'

const P = ({ children, className, ...props }: HTMLHeadingElementProps) => {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`} {...props}>
      {children}
    </p>
  )
}

export default P
