import { FC } from 'react'

import dayjs from 'dayjs'
import EyeLineIcon from 'remixicon-react/EyeLineIcon'
import Lock2LineIcon from 'remixicon-react/Lock2LineIcon'

import { App, StoreItemStatus } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { AppIcon } from './AppIcon'

type AppCardProps = {
  app?: App
}

export const AppCard: FC<AppCardProps> = ({ app }) => {
  const { name, description } = app || {}
  return (
    <Card>
      <Card.Content>
        <div className="h-60 flex flex-col truncate">
          <div className="h-12">
            <AppIcon app={app} size="sm" />
          </div>
          <h3 className="truncate mb-2">{name}</h3>
          <div className="flex-1">
            <div className="text-basicSurface-500 h-20 overflow-ellipsis overflow-hidden whitespace-normal">
              {description}
            </div>
          </div>
          <div className="flex items-start space-x-3">
            {app?.status !== StoreItemStatus.PUBLIC ? (
              <Lock2LineIcon />
            ) : (
              <EyeLineIcon />
            )}
            <div>
              <div className="text-basicSurface-900">
                {app?.status === StoreItemStatus.PUBLIC
                  ? 'Public app'
                  : 'Private app'}
              </div>
              {app?.updatedAt && (
                <div className="text-sm text-basicSurface-400">
                  Last updated on{' '}
                  {dayjs(app.updatedAt).toDate().toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
