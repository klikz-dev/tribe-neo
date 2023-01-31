import { List } from '@tribeplatform/react-ui-kit/Layout'

import { NavbarNavigationSettings } from './NavbarNavigationSettings'
import { NavbarStyleSettings } from './NavbarStyleSettings'

export const NavbarSettings = () => {
  return (
    <List spacing="sm">
      <List.Item>
        <NavbarStyleSettings />
      </List.Item>
      <List.Item>
        <NavbarNavigationSettings />
      </List.Item>
    </List>
  )
}
