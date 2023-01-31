import { ReactNode, useState } from 'react'

import AdjustmentsIcon from '@heroicons/react/outline/AdjustmentsIcon'
import CogIcon from '@heroicons/react/outline/CogIcon'
import LogoutIcon from '@heroicons/react/outline/LogoutIcon'
import SupportIcon from '@heroicons/react/outline/SupportIcon'
import TemplateIcon from '@heroicons/react/outline/TemplateIcon'
import UserCircleIcon from '@heroicons/react/outline/UserCircleIcon'
import { useHistory, Link } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { alert } from '@tribeplatform/react-ui-kit/Dialog'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

import { useLogout } from '../../../hooks/useLogout'
import { SupportModal } from '../../SupportModal'
import { NavbarControlItem } from '../constants'

type ControlProfileItem = {
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

export const NavbarControlProfile = ({
  presentation,
}: NavbarControlProfileProps) => {
  const { data: authToken } = useAuthToken()
  const { member, network } = authToken || {}
  const { logout } = useLogout()
  const [supportModal, setSupportModal] = useState<boolean>(false)

  const [canUpdateNetwork] = hasScopesPermission(network, ['updateNetwork'])

  const history = useHistory()

  const openCustomizer = () => {
    if (window.innerWidth < 850) {
      alert({
        title: 'Screen Size Too Small',
        description:
          'We currently do not support using the customizer on small-screen devices. If you are using a tablet, try rotating it to the landscape orientation, or try a device with a larger screen.',
      })
    } else {
      history.push('/customizer')
    }
  }

  let profileItems: Array<ControlProfileItem> = [
    {
      name: 'Your Profile',
      href: `/member/${member?.id}`,
      icon: <UserCircleIcon />,
    },
    {
      name: 'Account Settings',
      href: '/settings/profile',
      icon: <AdjustmentsIcon />,
    },
  ]
  if (canUpdateNetwork) {
    profileItems = profileItems.concat([
      { name: '-' },
      {
        name: 'Administration',
        as: 'a',
        href: '/admin/network/settings',
        icon: <CogIcon />,
      },
      {
        name: (
          <div className="flex items-center">
            Customizer
            <Badge className="mx-1" variant="secondary" rounded size="sm">
              New
            </Badge>
          </div>
        ),
        action: openCustomizer,
        icon: <TemplateIcon />,
      },
      {
        name: 'Help & Community',
        action: () => setSupportModal(true),
        icon: <SupportIcon />,
      },
    ])
  }
  profileItems = profileItems.concat([
    { name: '-' },
    { name: 'Sign out', action: () => logout(), icon: <LogoutIcon /> },
  ])

  return (
    <>
      <Dropdown placement="bottom-end">
        <Dropdown.ButtonMinimal>{presentation}</Dropdown.ButtonMinimal>
        <Dropdown.Items>
          {profileItems.map(item => {
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
      <SupportModal
        open={supportModal}
        onClose={() => setSupportModal(false)}
      />
    </>
  )
}
