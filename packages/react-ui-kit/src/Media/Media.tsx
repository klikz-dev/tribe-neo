import { ReactNode, FC } from 'react'

import { Icon, IconProps } from '../Icon'

export type MediaProps = React.ComponentProps<'div'> & {
  icon: IconProps | ReactNode
  title: string
  description?: string
}

export const Media: FC<MediaProps> = props => {
  const { title, description, icon } = props

  return (
    <div className="flex">
      <div className="mr-4 flex-shrink-0">
        <Icon className="h-16 w-16 bg-surface-50 text-basicSurface-300">
          {icon}
        </Icon>
      </div>
      <div>
        <h4>{title}</h4>
        {description && <p className="mt-1">{description}</p>}
      </div>
    </div>
  )
}
