import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Space } from '@tribeplatform/gql-client/types'
import { Tabs } from '@tribeplatform/react-ui-kit/Tabs'

import { SpaceMembershipRequests } from '../Space/SpaceMembershipRequests'
import { SpaceMemberList } from './SpaceMemberList'

export const WhySpaceMemberList = ({ space }: { space: Space }) => {
  const [canApproveSpaceMembershipRequest] = hasScopesPermission(space, [
    'approveSpaceMembershipRequest',
  ])

  if (canApproveSpaceMembershipRequest && space.inviteOnly) {
    return (
      <div>
        <Tabs.Group>
          <Tabs.List variant="pills" fullWidth>
            <Tabs.Tab>All members</Tabs.Tab>
            <Tabs.Tab>Member requests</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel>
              <SpaceMemberList spaceId={space.id} key="space-members-list" />
            </Tabs.Panel>
            <Tabs.Panel>
              <SpaceMembershipRequests
                spaceId={space.id}
                key="space-requests-list"
              />
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs.Group>
      </div>
    )
  }
  return <SpaceMemberList spaceId={space.id} key="members-list" />
}
