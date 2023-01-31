import { ReactNode, FC } from 'react'

import clsx from 'clsx'

import { Icon, IconProps } from '../Icon'

export type DashedProps = React.ComponentProps<'button'> & {
  icon: IconProps
}
const Dashed: FC<DashedProps> = props => {
  const { icon, children, className, ...rest } = props
  return (
    <button
      type="button"
      className={clsx(
        'relative block w-full border-2 border-neutral-300 border-dashed rounded-lg p-12 text-center hover:border-neutral-400',
        'focus:outline-none focus-visible:ring',
        className,
      )}
      {...rest}
    >
      <Icon className="mx-auto h-12 w-12 text-basicSurface-400">{icon}</Icon>
      <span className="mt-2 block text-basicSurface-900">{children}</span>
    </button>
  )
}

export type EmptyStateProps = React.ComponentProps<'div'> & {
  icon: IconProps | ReactNode
  title: string
  description?: string
}
/**
 * Empty states occur when an item’s content can’t be shown.
 */
export const EmptyState = (props: EmptyStateProps) => {
  const { title, description, icon, children } = props

  return (
    <div className="text-center">
      <Icon className="mx-auto h-12 w-12 text-basicSurface-400">{icon}</Icon>
      <h3 className="mt-2 text-basicSurface-900">{title}</h3>
      {description && (
        <p className="mt-1 text-basicSurface-500">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}

EmptyState.Dashed = Dashed
