import BellIcon from '@heroicons/react/outline/BellIcon'

import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

import { NotificationDropdownList } from './NotificationDropdownList'

export const NotificationDropdown = () => {
  return (
    <Dropdown className="ml-5 flex-shrink-0" placement="bottom-end">
      <Dropdown.ButtonMinimal className="w-10 h-10 items-center justify-center">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Dropdown.ButtonMinimal>
      <Dropdown.Items className="w-96">
        <NotificationDropdownList />
      </Dropdown.Items>
    </Dropdown>
  )
}
