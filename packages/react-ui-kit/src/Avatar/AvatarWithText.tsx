import { FC } from 'react'

import { Avatar, AvatarProps } from './Avatar'

export type AvatarWithTextProps = AvatarProps & {
  description?: string
}

export const AvatarWithText: FC<AvatarWithTextProps> = props => {
  const { description, name, ...avatarProps } = props

  return (
    <div className="flex items-center">
      <div>
        <Avatar {...avatarProps} name={name} size="md" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-basicSurface-700 group-hover:text-basicSurface-900">
          {name}
        </p>
        <p className="text-xs font-medium text-basicSurface-500 group-hover:text-basicSurface-700">
          {description}
        </p>
      </div>
    </div>
  )
}

export const AvatarWithBottomText: FC<AvatarWithTextProps> = props => {
  const { description, name, ...avatarProps } = props

  return (
    <div className="flex items-center flex-col">
      <Avatar {...avatarProps} name={name} size="3xl" />
      <h3 className="mt-6 text-basicSurface-900 text-base font-medium">
        {name}
      </h3>
      <dl className="mt-1 flex-grow flex flex-col justify-between">
        <dt className="sr-only">Title</dt>
        <dd className="text-basicSurface-500 text-sm">{description}</dd>
      </dl>
    </div>
  )
}
