import {
  App,
  AppCollaborator,
  AppCollaboratorType,
} from '@tribeplatform/gql-client/types'
import { useGlobalRemoveAppCollaborator } from '@tribeplatform/react-sdk/hooks'
import { AvatarWithText } from '@tribeplatform/react-ui-kit/Avatar'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { confirm } from '@tribeplatform/react-ui-kit/Dialog'

import { useGlobalToken } from '../../../../hooks'

export const CollaboratorListItem = (props: {
  collaborator: AppCollaborator
  app: App
}) => {
  const { collaborator, app } = props
  const { email } = useGlobalToken()

  const { mutate: remove } = useGlobalRemoveAppCollaborator()

  const onRemove = async () => {
    const confirmed = await confirm({
      title: 'Are you sure you want to remove collaborator?',
      proceedLabel: 'Remove',
      danger: true,
    })
    if (!confirmed) {
      return
    }

    remove({
      appId: app.id,
      collaboratorId: collaborator.id,
    })
  }

  const isAuthUser = collaborator.email === email

  return (
    <div className="flex space-x-3">
      <div className="flex-1">
        <AvatarWithText
          size="md"
          name={`${collaborator.email} ${isAuthUser ? ' (you)' : ''}`}
        />
      </div>
      <>
        {collaborator.type !== AppCollaboratorType.OWNER && !isAuthUser && (
          <Button size="sm" variant="danger" onClick={onRemove}>
            Remove
          </Button>
        )}
        {collaborator.type === AppCollaboratorType.OWNER && (
          <Button size="sm" variant="outline" disabled>
            Owner
          </Button>
        )}
      </>
    </div>
  )
}
