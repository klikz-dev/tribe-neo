import {
  App,
  AppInstallation,
  Image,
  AppInstallationStatus,
} from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { CheckIcon } from '@tribeplatform/react-ui-kit/icons'

export const AppCard = ({
  app,
  appInstallation,
}: {
  app: App
  appInstallation: AppInstallation
}) => {
  return (
    <Card className="h-full">
      <Card.Content>
        <div className="flex flex-col space-y-5 h-full">
          <Avatar size="md" name={app?.name} src={(app?.image as Image)?.url} />
          <h4>{app?.name}</h4>
          {app?.description && <p>{app.description}</p>}
          {appInstallation?.status === AppInstallationStatus.ENABLED && (
            <div className="flex-grow flex flex-col justify-end">
              <div>
                <Badge leadingIcon={<CheckIcon />} rounded>
                  Installed
                </Badge>
              </div>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  )
}
