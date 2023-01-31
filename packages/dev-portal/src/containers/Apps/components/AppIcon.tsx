import { FC } from 'react'

import { App, Image } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

export type AppIconProps = {
  app?: App | null
  size: 'sm' | 'md'
}
export const AppIcon: FC<AppIconProps> = ({ app, size, ...rest }) => {
  if (app?.globalImage) {
    return (
      <Avatar
        src={(app.globalImage as Image)?.urls?.thumb}
        name={app?.name}
        size={size}
        rounded={false}
        {...rest}
      />
    )
  }

  return (
    <Avatar size={size} name={app?.name || ' '} rounded={false} {...rest} />
  )
}
