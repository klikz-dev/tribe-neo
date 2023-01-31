import { ReactNode, FC } from 'react'

import clsx from 'clsx'

import { IconProps } from '../Icon'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export type AvatarProps = React.ComponentProps<'div'> & {
  size?: AvatarSize
  src?: string | null
  name?: string
  icon?: IconProps | ReactNode
  rounded?: boolean
}

const initials = (name: string) => {
  const [firstName, lastName] = name.split(' ')
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}
/**
 * The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon.
 */
export const Avatar: FC<AvatarProps> = props => {
  const { size = 'md', rounded = true, src, name, icon, className } = props

  const sizeClsx = {
    'h-6 w-6 ': size === 'xs',
    'h-8 w-8': size === 'sm',
    'h-10 w-10': size === 'md',
    'h-12 w-12': size === 'lg',
    'h-16 w-16': size === 'xl',
    'h-24 w-24': size === '2xl',
    'h-32 w-32': size === '3xl',
  }

  const iconSizeClsx = {
    'h-1.5 w-1.5': size === 'xs',
    'h-2 w-2': size === 'sm',
    'h-3 w-3': size === 'md',
    'h-3.5 w-3.5': size === 'lg',
    'h-4 w-4 ': size === 'xl',
    'h-5 w-5 ': size === '2xl',
    'h-6 w-6 ': size === '3xl',
  }

  if (!src) {
    if (name) {
      return (
        <span
          className={clsx(
            'inline-flex relative items-center justify-center flex-shrink-0 bg-surface-200',
            rounded ? 'rounded-full' : 'rounded-md',
            sizeClsx,
            className,
          )}
        >
          <span
            className={`text-${size} font-medium leading-none text-basicSurface-500`}
          >
            {name ? initials(name) : null}
          </span>
          {icon && (
            <div className={clsx('absolute bottom-0 right-0 ', iconSizeClsx)}>
              {icon}
            </div>
          )}
        </span>
      )
    }

    return (
      <span
        className={clsx(
          'inline-block relative bg-surface-200 flex-shrink-0',
          rounded ? 'rounded-full' : 'rounded-md',
          sizeClsx,
          className,
        )}
      >
        <span
          className={clsx(
            'inline-block overflow-hidden ',
            rounded ? 'rounded-full' : 'rounded-md',
            sizeClsx,
          )}
        >
          <svg
            className="h-full w-full text-basicSurface-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        {icon && (
          <div className={clsx('absolute bottom-0 right-0 ', iconSizeClsx)}>
            {icon}
          </div>
        )}
      </span>
    )
  }

  return (
    <span className="inline-block relative flex-shrink-0">
      <img
        className={clsx(
          'bg-surface-50 inline-block object-cover object-center',
          rounded ? 'rounded-full' : 'rounded-md',
          sizeClsx,
          className,
        )}
        src={src}
        alt={name}
      />
      {icon && (
        <div className={clsx('absolute bottom-0 right-0 ', iconSizeClsx)}>
          {icon}
        </div>
      )}
    </span>
  )
}
