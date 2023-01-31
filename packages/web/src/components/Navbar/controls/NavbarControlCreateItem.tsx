import { ReactNode, useState } from 'react'

import CubeIcon from '@heroicons/react/outline/CubeIcon'
import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import UserAddIcon from '@heroicons/react/outline/UserAddIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import { Link } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

import { CollectionFormModal } from '../../Collection/CollectionFormModal'
import { CreateSpaceModal } from '../../Space/CreateSpaceModal'
import { UserImportModal } from '../../UserImport'
import { NavbarControlItem } from '../constants'

type CreateMenuItem = {
  name?: string
  href?: string
  icon?: ReactNode
  as?: 'a' | Link
  action?: () => void
}

export type NavbarControlProfileProps = {
  item: NavbarControlItem
  presentation: ReactNode
}

export const NavbarControlCreateItem = ({
  presentation,
}: NavbarControlProfileProps) => {
  const { data: authToken } = useAuthToken()
  const { network } = authToken || {}

  const [openSpaceModal, setOpenSpaceModal] = useState(false)
  const [openCollectionModal, setOpenCollectionModal] = useState(false)
  const [openMemberInviteModal, setOpenMemberInviteModal] = useState(false)

  const [canCreatePost, canCreateSpace, canCreateCollection, canInviteMembers] =
    hasScopesPermission(network, [
      'createPost',
      'createSpace',
      'createCollection',
      'inviteMembers',
    ])

  if (
    !canCreatePost &&
    !canCreateSpace &&
    !canCreateCollection &&
    !canInviteMembers
  )
    return null

  const menuOptions: Array<CreateMenuItem> = []

  if (canCreatePost)
    menuOptions.push({
      name: 'Add post',
      icon: <PencilAltIcon />,
    })
  if (canCreateSpace)
    menuOptions.push({
      name: 'Add space',
      icon: <CubeIcon />,
      action: () => setOpenSpaceModal(true),
    })
  if (canCreateCollection)
    menuOptions.push({
      name: 'Add collection',
      icon: <ViewGridIcon />,
      action: () => setOpenCollectionModal(true),
    })
  if (canInviteMembers)
    menuOptions.push({
      name: 'Invite members',
      icon: <UserAddIcon />,
      action: () => setOpenMemberInviteModal(true),
    })

  return (
    <>
      <Dropdown placement="bottom-end">
        <Dropdown.ButtonMinimal className="rounded-full">
          {presentation}
        </Dropdown.ButtonMinimal>
        <Dropdown.Items>
          {menuOptions.map(item => {
            if (item?.name === '-')
              return (
                <div
                  key="static-key-navbar-divider"
                  className="w-full border-t border-neutral-100 my-2"
                />
              )

            if (item.as === 'a')
              return (
                <Dropdown.Item
                  leadingIcon={item.icon}
                  key={item.name}
                  as="a"
                  href={item.href || '#'}
                  onClick={item.action}
                >
                  {item.name}
                </Dropdown.Item>
              )

            return (
              <Dropdown.Item
                leadingIcon={item.icon}
                key={item.name}
                as={Link}
                to={item.href || '#'}
                onClick={item.action}
              >
                {item.name}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Items>
      </Dropdown>

      {openSpaceModal ? (
        <CreateSpaceModal
          open={openSpaceModal}
          onClose={() => {
            setOpenSpaceModal(false)
          }}
        />
      ) : null}
      {openCollectionModal ? (
        <CollectionFormModal
          open={openCollectionModal}
          onClose={() => {
            setOpenCollectionModal(false)
          }}
        />
      ) : null}

      {openMemberInviteModal && (
        <UserImportModal
          open={openMemberInviteModal}
          onClose={() => {
            setOpenMemberInviteModal(false)
          }}
        />
      )}
    </>
  )
}
