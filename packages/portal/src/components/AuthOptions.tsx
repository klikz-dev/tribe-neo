import { FC } from 'react'

import LogoutCircleLineIcon from 'remixicon-react/LogoutCircleLineIcon'

import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

import { useGlobalToken } from '../hooks'
import { useLogout } from '../hooks/useLogout'

export const AuthOptions: FC = () => {
  const { logout } = useLogout()
  const { email } = useGlobalToken()

  return (
    <Dropdown placement="bottom-end">
      <Dropdown.ButtonMinimal></Dropdown.ButtonMinimal>
      <Dropdown.Items className="divide-y divide-neutral-100">
        <div className="py-1">
          <Dropdown.Item disabled>
            <div className="font-semibold">{email}</div>
          </Dropdown.Item>
        </div>
        <div className="pt-1">
          <Dropdown.Item
            onClick={logout}
            leadingIcon={<LogoutCircleLineIcon />}
            data-testid="network-logout-di"
          >
            Log out
          </Dropdown.Item>
        </div>
      </Dropdown.Items>
    </Dropdown>
  )
}
