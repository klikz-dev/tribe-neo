import { AppCollaboratorType } from '@tribeplatform/gql-client/types'
import { useGlobalAppCollaborators } from '@tribeplatform/react-sdk/hooks'
import { List } from '@tribeplatform/react-ui-kit/Layout'

import { CollaboratorListItem } from './CollaboratorListItem'

export const CollaboratorList = ({ app }) => {
  const { data, isLoading } = useGlobalAppCollaborators({
    variables: {
      appId: app?.id,
    },
  })

  const owners = data?.filter(it => it.type === AppCollaboratorType.OWNER)
  const collaborators = data?.filter(
    it => it.type !== AppCollaboratorType.OWNER,
  )

  return (
    <List divider>
      {owners?.map(owner => (
        <List.Item key={owner.id}>
          <CollaboratorListItem collaborator={owner} app={app} />
        </List.Item>
      ))}
      {collaborators?.map(collaborator => (
        <List.Item key={collaborator.id}>
          <CollaboratorListItem collaborator={collaborator} app={app} />
        </List.Item>
      ))}
      {isLoading ? <CollaboratorListLoading /> : null}
    </List>
  )
}

export const CollaboratorListLoading = ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={i}>
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="rounded-full bg-surface-300 h-8 w-8" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
            </div>
          </div>
        </List.Item>
      ))}
    </>
  )
}
