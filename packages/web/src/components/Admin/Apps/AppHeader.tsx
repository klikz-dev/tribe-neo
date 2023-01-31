import { App, AppInstallation, Image } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { AppHeaderActions } from './AppHeaderActions'

export const AppHeader = ({
  app,
  appInstallation,
}: {
  app: App
  appInstallation: AppInstallation
}) => {
  return (
    <Card className="mb-5">
      <PageHeader
        title={app?.name}
        description={app?.description}
        avatar={
          <Avatar
            size="2xl"
            className="ring-4 bg-surface-50 ring-surface-50 ring-offset-0 ring-offset-surface-50	sm:h-32 sm:w-32"
            src={(app?.image as Image)?.url}
            name={app?.name}
          />
        }
        backgroundImage={
          (app?.banner as Image)?.url || (
            <div className="h-16 w-full object-cover lg:h-24 group relative" />
          )
        }
        backgroundColor={(app?.banner as Image)?.dominantColorHex}
        action={
          <AppHeaderActions app={app} appInstallation={appInstallation} />
        }
      />
    </Card>
  )
}
