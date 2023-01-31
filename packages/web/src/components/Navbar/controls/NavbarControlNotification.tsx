import { ReactNode } from 'react'

import {
  useClearNotificationsCount,
  useNotificationsCount,
} from '@tribeplatform/react-sdk/hooks'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'
import { IndicatorBadge } from '@tribeplatform/react-ui-kit/IndicatorBadge'

import { NotificationDropdownList } from '../../Notification/NotificationDropdownList'
import { NavbarControlItem } from '../constants'

export type NavbarControlNotificationProps = {
  item: NavbarControlItem
  presentation: ReactNode
}

export const NavbarControlNotification = ({
  presentation,
}: NavbarControlNotificationProps) => {
  const { data: notificationCount } = useNotificationsCount()
  const { mutate: clearNotificationCount } = useClearNotificationsCount()

  const onClick = () => {
    // This is because we are trying to avoid re-rendering so we are calling the function on the next loop
    setTimeout(() => {
      clearNotificationCount()
    }, 0)
  }

  return (
    <Dropdown placement="bottom-end">
      <Dropdown.ButtonMinimal
        className="w-10 h-10 items-center justify-center"
        onClick={onClick}
      >
        <IndicatorBadge className="translate-y-0" count={notificationCount}>
          {presentation}
        </IndicatorBadge>
      </Dropdown.ButtonMinimal>
      <Dropdown.Items className="w-96">
        <NotificationDropdownList />
      </Dropdown.Items>
    </Dropdown>
  )
}
