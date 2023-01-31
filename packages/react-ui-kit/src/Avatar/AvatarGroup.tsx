import { cloneElement, ReactNode } from 'react'

import clsx from 'clsx'

import { getValidChildren } from '../utils'
import { AvatarSize } from './Avatar'

export interface AvatarGroupOptions {
  children: ReactNode
  size?: AvatarSize
  moreCount?: number
}

export const AvatarGroup = (props: AvatarGroupOptions) => {
  const { size, moreCount, children } = props

  const validChildren = getValidChildren(children)
  /**
   * Reversing the children is a great way to avoid using zIndex
   * to overlap the avatars
   */
  const reversedChildren = validChildren.reverse()

  const clones = reversedChildren.map(child => {
    const childProps = {
      className: 'ring-2 ring-surface-50',
      size,
    }

    return cloneElement(child, childProps)
  })
  if (moreCount) {
    clones.push(<MoreIndicator moreCount={moreCount} size={size} />)
  }

  const sizeClsx = {
    '-space-x-1': size === 'sm' || size === 'xs',
    '-space-x-2 ': size === 'md',
    '-space-x-2': size === 'lg' || size === 'xl',
  }

  return <div className={clsx('flex overflow-hidden', sizeClsx)}>{clones}</div>
}

const MoreIndicator = ({ moreCount, size }) => {
  const sizeClsx = {
    'h-6 w-6 ': size === 'xs',
    'h-8 w-8': size === 'sm',
    'h-10 w-10': size === 'md',
    ' h-12 w-12': size === 'lg',
    'h-16 w-16': size === 'xl',
    'h-24 w-24': size === '2xl',
    'h-32 w-32': size === '3xl',
  }

  return (
    <span className="inline-block relative">
      <span
        className={clsx(
          'inline-flex items-center justify-center rounded-full ring-2 ring-surface-50',
          'bg-surface-200',
          sizeClsx,
        )}
      >
        <span
          className={`text-${size} font-medium leading-none text-basicSurface-500`}
        >
          +{moreCount}
        </span>
      </span>
    </span>
  )
}
