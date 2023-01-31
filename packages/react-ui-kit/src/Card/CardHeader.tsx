import { ReactNode, FC } from 'react'

import clsx from 'clsx'

import { useCard } from './CardContext'

const Simple = ({ title }) => {
  return <h3 className="text-basicSurface-900">{title}</h3>
}

const WithDescription = ({ title, description }) => {
  return (
    <div>
      <h3 className="text-basicSurface-900">{title}</h3>
      <p className="mt-1 text-basicSurface-500">{description}</p>
    </div>
  )
}

const WithAction = ({ title, action }) => {
  return (
    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
      <div className="ml-4 mt-2">
        <h3 className="text-basicSurface-900">{title}</h3>
      </div>
      <div className="ml-4 mt-2 flex-shrink-0">{action}</div>
    </div>
  )
}

const WithDescriptionAndAction = ({ title, description, action }) => {
  return (
    <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
      <div className="ml-4 mt-4">
        <h3 className="leading-6 text-basicSurface-900">{title}</h3>
        <p className="mt-1 text-basicSurface-500">{description}</p>
      </div>
      <div className="ml-4 mt-4 flex-shrink-0">{action}</div>
    </div>
  )
}

export type CardHeaderProps = {
  title?: string
  description?: string
  action?: ReactNode
  withBorder?: boolean
}

export const CardHeader: FC<CardHeaderProps> = props => {
  const { title, description, action, withBorder = false, children } = props
  const { padding } = useCard()

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

  return (
    <div
      className={clsx(
        padding === 'md' && 'px-4 py-5 sm:p-6 ',
        padding === 'sm' && 'px-4 py-5 sm:px-3',
        !withBorder && 'pb-0 sm:pb-0',
        withBorder && 'border-b border-neutral-200',
      )}
    >
      {content}
    </div>
  )
}
