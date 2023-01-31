import { ReactNode } from 'react'

import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'

const Title = ({ children }) => {
  const { text900Clsx } = useBackgroundContext()

  return <h3 className={clsx(text900Clsx)}>{children}</h3>
}

const Description = ({ children }) => {
  const { text500Clsx } = useBackgroundContext()

  return (
    <p
      className={clsx(
        'mt-2 max-w-4xl overflow-hidden overflow-ellipsis',
        text500Clsx,
      )}
    >
      {children}
    </p>
  )
}

const Simple = ({ title, children }) => {
  return (
    <div className="pb-5">
      <Title>{title}</Title>
      {children && <div className="mt-3 sm:mt-4">{children}</div>}
    </div>
  )
}

const WithDescription = ({ title, description, children }) => {
  return (
    <div className="pb-5 ">
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children && <div className="mt-3 sm:mt-4">{children}</div>}
    </div>
  )
}

const WithAction = ({ title, action, children }) => {
  return (
    <div className="pb-5 ">
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <Title>{title}</Title>
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">{action}</div>
      </div>
      {children && <div className="mt-3 sm:mt-4">{children}</div>}
    </div>
  )
}

const WithDescriptionAndAction = ({ title, description, action, children }) => {
  return (
    <div className="pb-5 ">
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <div className="sm:w-0 sm:flex-1">
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>

        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">{action}</div>
      </div>
      {children && <div className="mt-3 sm:mt-4">{children}</div>}
    </div>
  )
}

export type SectionHeaderProps = {
  title: string
  description?: string
  action?: ReactNode
  children?: ReactNode
  className?: string
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { title, description, action, children, className } = props

  let content
  if (!!title && !!description && !!action) {
    content = (
      <WithDescriptionAndAction
        title={title}
        description={description}
        action={action}
      >
        {children}
      </WithDescriptionAndAction>
    )
  } else if (action) {
    content = (
      <WithAction title={title} action={action}>
        {children}
      </WithAction>
    )
  } else if (description) {
    content = (
      <WithDescription title={title} description={description}>
        {children}
      </WithDescription>
    )
  } else if (title) {
    content = <Simple title={title}>{children}</Simple>
  } else {
    content = children
  }

  return <div className={className}>{content}</div>
}
