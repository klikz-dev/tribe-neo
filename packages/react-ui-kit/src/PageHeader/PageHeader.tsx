import { ReactNode } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'

const Title = ({ children }) => {
  const { text900Clsx } = useBackgroundContext()

  return <h2 className={clsx('truncate', text900Clsx)}>{children}</h2>
}

const Description = ({ children }) => {
  const { text500Clsx } = useBackgroundContext()

  return (
    <div className={clsx('mt-2 flex items-center', text500Clsx)}>
      {children}
    </div>
  )
}

const Simple = ({ title }) => {
  return (
    <div className="flex-1 min-w-0 mb-5">
      <Title>{title}</Title>
    </div>
  )
}

const WithDescription = ({ title, description }) => {
  return (
    <div className="flex-1 min-w-0 mb-5">
      <Title>{title}</Title>
      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
        <Description>{description}</Description>
      </div>
    </div>
  )
}

const WithAction = ({ title, action }) => {
  return (
    <div className="md:flex md:items-center md:justify-between mb-5">
      <div className="flex-1 min-w-0">
        <Title>{title}</Title>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">{action}</div>
    </div>
  )
}

const WithDescriptionAndAction = ({ title, description, action }) => {
  const { backgroundClsx } = useBackgroundContext()

  return (
    <div
      className={clsx(
        'lg:flex lg:items-center lg:justify-between mb-5',
        backgroundClsx,
      )}
    >
      <div className="flex-1 min-w-0">
        <Title>{title}</Title>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <Description>{description}</Description>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4 space-x-3">{action}</div>
    </div>
  )
}

const WithBannerImage = props => {
  const {
    title,
    backgroundImage,
    backgroundColor,
    avatar,
    action,
    description,
  } = props
  let background = <div className="h-16 w-full object-cover lg:h-24" />
  if (backgroundImage) {
    if (typeof backgroundImage === 'string') {
      background = (
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={backgroundImage}
          alt=""
        />
      )
    } else {
      background = backgroundImage || background
    }
  }
  return (
    <div>
      <div className="bg-main-200" style={{ background: backgroundColor }}>
        {background}
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {avatar ? (
          <div className="sm:flex sm:items-end sm:space-x-5 mb-5">
            <div className="flex -mt-12 sm:-mt-16 relative">
              {typeof avatar === 'string' ? (
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-surface-50 sm:h-32 sm:w-32"
                  src={avatar}
                  alt={title}
                />
              ) : (
                <div className="h-24 w-24 flex items-center justify-center sm:h-32 sm:w-32">
                  {avatar}
                </div>
              )}
            </div>
            <div className="sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 mt-5">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl text-basicMain-900 truncate">
                  {title}
                </h1>
                {description && (
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <Description>{description}</Description>
                  </div>
                )}
              </div>
              <div className="flex flex-row space-y-0 space-x-2 mt-3 sm:mt-0">
                {action}
              </div>
            </div>
          </div>
        ) : (
          <div className="my-4 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mb-2 sm:mb-0 min-w-0 flex-1">
              <h1 className="text-2xl text-basicMain-900 truncate">{title}</h1>
            </div>
            <div className="flex flex-row space-y-0 space-x-2 mt-3 sm:mt-0">
              {action}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export type PageHeaderProps =
  | {
      title: ReactNode
      description?: string
      action?: ReactNode
      children?: ReactNode
      padding?: 'none' | 'sm' | 'md' | 'lg'
    }
  | {
      title: ReactNode
      description?: string
      backgroundColor: string
      backgroundImage: string | ReactNode
      avatar: string | ReactNode
      action?: ReactNode
    }

export const PageHeader = (props: PageHeaderProps) => {
  if ('backgroundImage' in props) {
    const {
      title,
      action,
      backgroundImage,
      backgroundColor,
      avatar,
      description,
    } = props

    return (
      <WithBannerImage
        title={title}
        description={description}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        avatar={avatar}
        action={action}
      />
    )
  }

  const { title, description, action, children, padding = 'none' } = props

  let content
  if (!!title && !!description && !!action) {
    content = (
      <WithDescriptionAndAction
        title={title}
        description={description}
        action={action}
      />
    )
  } else if (action) {
    content = <WithAction title={title} action={action} />
  } else if (description) {
    content = <WithDescription title={title} description={description} />
  } else if (title) {
    content = <Simple title={title} />
  } else {
    content = children
  }

  const paddingClsx = [
    padding === 'sm' && 'px-1',
    padding === 'md' && 'px-2',
    padding === 'lg' && 'px-3',
  ]

  return <div className={clsx(paddingClsx)}>{content}</div>
}
