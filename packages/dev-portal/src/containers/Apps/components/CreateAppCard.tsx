import { FC } from 'react'

import AddLineIcon from 'remixicon-react/AddLineIcon'

import { Card } from '@tribeplatform/react-ui-kit/Card'

export const CreateAppCard: FC = () => {
  return (
    <Card>
      <Card.Content>
        <div className="h-60">
          <div className="h-12">
            <AddLineIcon className="h-8 w-8 text-actionPrimary-700" />
          </div>
          <h3 className="mb-2">Create a new app</h3>
          <div className="text-basicSurface-500">
            Once you create an app, the credentials required to use Tribe&apos;s
            API and Webhooks will be automatically generated.
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
