import { App } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { ComposerReadonly } from '../../Composer/ComposerReadonly'

export const AppAbout = ({ app }: { app: App }) => {
  if (app && !app?.about)
    return (
      <Card className="h-32">
        <div className="h-32 flex flex-col justify-center">
          <h3 className="text-center">This app has no description</h3>
        </div>
      </Card>
    )
  return (
    <Card>
      <Card.Content>
        {app?.about && <ComposerReadonly value={app?.about} />}
      </Card.Content>
    </Card>
  )
}
