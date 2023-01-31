import { FC } from 'react'

import clsx from 'clsx'

import { BackgroundProvider } from '../BackgroundContext'
import { HTMLTribeProps } from '../system'

export type ActionPanelProps = HTMLTribeProps<'div'> & {
  title?: string
  description?: string
  placement?: 'bottom' | 'trailing' | 'trailing-top'
}

const Title = ({ children }) => {
  return <h3 className="text-basicSurface-900">{children}</h3>
}

const Description = ({ children, className }) => {
  return (
    <div className={clsx('max-w-8xl text-basicSurface-500', className)}>
      <p>{children}</p>
    </div>
  )
}

const PlacementBottom = ({ title, description, children }) => (
  <>
    {title && <Title>{title}</Title>}
    {description && (
      <Description className={clsx(title && 'mt-2')}>{description}</Description>
    )}
    {children && <div className="mt-5 text-sm">{children}</div>}
  </>
)

const PlacementTrailing = ({ title, description, children }) => (
  <>
    {title && <Title>{title}</Title>}
    <div
      className={clsx(
        'sm:flex sm:items-start sm:justify-between',
        title && 'mt-2',
      )}
    >
      {description && <Description className="">{description}</Description>}
      {children && (
        <div className="mt-5 text-sm sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
          {children}
        </div>
      )}
    </div>
  </>
)

const PlacementTrailingTop = ({ title, description, children }) => (
  <div className="sm:flex sm:items-start sm:justify-between">
    <div>
      {title && <Title>{title}</Title>}
      {description && (
        <Description className={clsx(title && 'mt-2')}>
          {description}
        </Description>
      )}
    </div>
    {children && (
      <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
        {children}
      </div>
    )}
  </div>
)

export const ActionPanel: FC<ActionPanelProps> = props => {
  const {
    as,
    title,
    description,
    children,
    placement = 'bottom',
    className,
    ...rest
  } = props

  const Component = as || 'div'

  return (
    <BackgroundProvider backgroundType="surface">
      <Component
        className={clsx(
          'bg-surface-50 text-basicSurface-500 shadow sm:rounded-lg',
          className,
        )}
        {...rest}
      >
        <div className="px-4 py-5 sm:p-6">
          {placement === 'bottom' && (
            <PlacementBottom title={title} description={description}>
              {children}
            </PlacementBottom>
          )}
          {placement === 'trailing' && (
            <PlacementTrailing title={title} description={description}>
              {children}
            </PlacementTrailing>
          )}
          {placement === 'trailing-top' && (
            <PlacementTrailingTop title={title} description={description}>
              {children}
            </PlacementTrailingTop>
          )}
        </div>
      </Component>
    </BackgroundProvider>
  )
}
