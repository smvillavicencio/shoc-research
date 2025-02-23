import { HTMLElementProps } from '@/types/globals'
import React from 'react'

const Small = ({ children, className, ...props }: HTMLElementProps) => {
  return (
    <small className={`text-sm font-medium leading-none ${className}`} {...props}>
      {children}
    </small>
  )
}

export default Small
