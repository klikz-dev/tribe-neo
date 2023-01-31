import { useState } from 'react'

import UsersIcon from '@heroicons/react/outline/UsersIcon'
import loadable from '@loadable/component'
import { Link } from 'react-router-dom'

import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'

import { useMobileSidebar } from '../../MobileSidebarProvider'

const UserImportModal = loadable(() => import('../UserImport'), {
  resolveComponent: module => module.UserImportModal,
})

export const SidebarInviteMembers = () => {
  const { setMobileSidebarOpen } = useMobileSidebar()
  const [openMemberInviteModal, setOpenMemberInviteModal] = useState(false)

  return (
    <>
      <NavVertical.Item
        as={Link}
        leadingIcon={<UsersIcon />}
        onClick={() => {
          setOpenMemberInviteModal(true)
          setMobileSidebarOpen(false)
        }}
        to="#"
      >
        Invite people
      </NavVertical.Item>

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
