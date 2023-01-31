import { FC } from 'react'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { useBackgroundContext } from '../BackgroundContext'
import { ExternalLinkIcon } from '../icons'
import { HTMLTribeProps } from '../system'

export const LINK_VARIANTS = [
  'inherit',
  'neutral',
  'primary',
  'accent',
] as const
export type LinkVariant = typeof LINK_VARIANTS[number]

export type LinkProps = HTMLTribeProps<'a'> & {
  /**
   *  If `true`, the link will open in new tab
   */
  external?: boolean
  variant?: LinkVariant
  disabled?: boolean
}

/**
 * Links are accessible elements used primarily for navigation.
 *
 * It integrates well with other routing libraries like
 * React Router, Reach Router and Next.js Link.
 *
 * @example
 *
 * ```jsx
 * <Link as={ReactRouterLink} to="/home">Home</Link>
 * ```
 */
export const Link: FC<LinkProps> = props => {
  const {
    as,
    external,
    variant = 'accent',
    children,
    className,
    disabled = 'false',
    ...rest
  } = props
  const Component = as || 'a'
  const { backgroundType } = useBackgroundContext()

  return (
    <Component
      className={twMerge(
        clsx(
          'cursor-pointer',
          'transition duration-100 ease-in-out ',
          variant === 'inherit' && 'hover:text-actionAccentHover-500',
          variant === 'neutral' && [
            backgroundType === 'main' &&
              'text-basicMain-600 hover:text-actionAccentHover-500',
            backgroundType === 'surface' &&
              'text-basicSurface-600 hover:text-actionAccentHover-500',
            backgroundType === 'secondary' &&
              'text-basicSecondary-600 hover:text-basicSecondary-800',
          ],
          variant === 'primary' &&
            'text-actionPrimary-600 hover:text-actionPrimary-500',
          variant === 'accent' &&
            'text-actionAccent-600 hover:text-actionAccentHover-500',
          className,
          disabled === true && 'pointer-events-none opacity-50',
        ),
      )}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
      {external && (
        <ExternalLinkIcon className="inline-block align-text-bottom ml-1" />
      )}
    </Component>
  )
}
