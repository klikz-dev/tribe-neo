import { useState } from 'react'

import BellIcon from '@heroicons/react/outline/BellIcon'
import CogIcon from '@heroicons/react/outline/CogIcon'
import UserAddIcon from '@heroicons/react/outline/UserAddIcon'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Space, SpaceMembershipStatus } from '@tribeplatform/gql-client/types'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { MemberNotificationSettingsModal } from '../Notification/MemberNotificationSettingsModal'
import { AddMembersModal } from './AddMembersModal'
import { SpaceMembershipButton } from './SpaceMembershipButton'

export const SpaceActionButtons = ({ space }: { space: Space }) => {
  const [addMemberModal, setAddMemberModal] = useState<boolean>(false)
  const [notificationModal, setNotificationModal] = useState<boolean>(false)

  const joined =
    space?.authMemberProps?.membershipStatus === SpaceMembershipStatus.JOINED

  const [canAddMembers, canUpdateSpace] = hasScopesPermission(space, [
    'addSpaceMembers',
    'updateSpace',
  ])

  return (
    <>
      {canUpdateSpace && (
        <Button
          leadingIcon={<CogIcon />}
          as="a"
          variant="outline"
          href={`/admin/space/${space.slug}/settings`}
        ></Button>
      )}
      {canAddMembers && (
        <Button
          variant="outline"
          title="Add members"
          onClick={() => setAddMemberModal(true)}
          leadingIcon={<UserAddIcon />}
        />
      )}
      {joined && (
        <Button
          variant="outline"
          onClick={() => setNotificationModal(true)}
          leadingIcon={<BellIcon />}
        />
      )}
      <SpaceMembershipButton space={space} />
      <Modal open={addMemberModal} onClose={() => setAddMemberModal(false)}>
        <Modal.Header title={`Add to ${space?.name}`} />
        <AddMembersModal
          space={space}
          onClose={() => setAddMemberModal(false)}
        />
      </Modal>

      <MemberNotificationSettingsModal
        spaceId={space.id}
        open={notificationModal}
        onClose={() => setNotificationModal(false)}
      />
    </>
  )
}
