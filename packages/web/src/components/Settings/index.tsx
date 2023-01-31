import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import KeyIcon from '@heroicons/react/outline/KeyIcon'
import LockClosedIcon from '@heroicons/react/outline/LockClosedIcon'
import UserIcon from '@heroicons/react/outline/UserIcon'
import { Link, matchPath, useLocation, Switch, Route } from 'react-router-dom'

import { useAuthMember } from '@tribeplatform/react-sdk/hooks'
import { BellIcon } from '@tribeplatform/react-ui-kit/icons'
import { Container } from '@tribeplatform/react-ui-kit/Layout'
import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'

import { AccountSettings } from './AccountSettings'
import { AppearanceSettings } from './AppearanceSettings'
import { NotificationSettings } from './NotificationSettings'
import { ProfileSettings } from './ProfileSettings'
import { SecuritySettings } from './SecuritySettings'

export const Settings = () => {
  const items = [
    { icon: <ArrowLeftIcon />, text: 'Back to Community', link: '/' },
    { icon: <UserIcon />, text: 'Profile', link: '/settings/profile' },
    { icon: <KeyIcon />, text: 'Account', link: '/settings/account' },
    { icon: <LockClosedIcon />, text: 'Security', link: '/settings/security' },
    {
      icon: <BellIcon />,
      text: 'Notifications',
      link: '/settings/notifications',
    },
    // {
    //   icon: <MoonIcon />,
    //   text: 'Appearance',
    //   link: '/settings/appearance',
    // },
  ]

  const { data: member } = useAuthMember()

  const location = useLocation()

  return (
    <Container className="grid grid-cols-12 gap-5">
      <div className="lg:col-span-3 md:col-span-3 col-span-12">
        <NavVertical>
          <NavVertical.Group>
            {items.map(item => {
              const active = matchPath(location.pathname, {
                path: item.link,
                exact: true,
                strict: false,
              })
              return (
                <NavVertical.Item
                  key={item.link}
                  active={!!active}
                  as={Link}
                  leadingIcon={item.icon}
                  to={item.link}
                >
                  {item.text}
                </NavVertical.Item>
              )
            })}
          </NavVertical.Group>
        </NavVertical>
      </div>
      <div className="lg:col-span-7 md:col-span-9 col-span-12">
        <Switch>
          <Route path="/settings/profile" exact>
            <ProfileSettings member={member} />
          </Route>
          <Route path="/settings/account" exact>
            <AccountSettings />
          </Route>
          <Route path="/settings/security" exact>
            <SecuritySettings />
          </Route>
          <Route path="/settings/notifications" exact>
            <NotificationSettings />
          </Route>
          <Route path="/settings/appearance" exact>
            <AppearanceSettings />
          </Route>
        </Switch>
      </div>
      <div className="lg:col-span-2 hidden" />
    </Container>
  )
}
