import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import CogIcon from '@heroicons/react/outline/CogIcon'
import DocumentTextIcon from '@heroicons/react/outline/DocumentTextIcon'
import GlobeAltIcon from '@heroicons/react/outline/GlobeAltIcon'
import KeyIcon from '@heroicons/react/outline/KeyIcon'
import UserGroupIcon from '@heroicons/react/outline/UserGroupIcon'
import UserIcon from '@heroicons/react/outline/UserIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import { matchPath, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'

interface AdminSidebarItem {
  icon: JSX.Element
  text: string
  link: string
}

const adminSidebarItems: AdminSidebarItem[] = [
  { icon: <ArrowLeftIcon />, text: 'Back to Community', link: '/' },
  { icon: <UserIcon />, text: 'Settings', link: '/admin/network/settings' },
  {
    icon: <UserGroupIcon />,
    text: 'Members',
    link: '/admin/network/members',
  },
  {
    icon: <DocumentTextIcon />,
    text: 'Posts',
    link: '/admin/network/posts',
  },
  {
    icon: <ViewGridIcon />,
    text: 'Spaces',
    link: '/admin/network/spaces',
  },
  {
    icon: <KeyIcon />,
    text: 'Authentication',
    link: '/admin/network/authentication',
  },
  {
    icon: <GlobeAltIcon />,
    text: 'Domain',
    link: '/admin/network/domain',
  },
  {
    icon: <ViewGridIcon />,
    text: 'Apps',
    link: '/admin/network/apps',
  },
  {
    icon: <DocumentTextIcon />,
    text: 'Pending posts',
    link: '/admin/network/pending-posts',
  },
  {
    icon: <CogIcon />,
    text: 'Moderation settings',
    link: '/admin/network/moderation/settings',
  },
]

export const MainSidebarContent = () => {
  const location = useLocation()

  return (
    <NavVertical className="px-2">
      <NavVertical.Group>
        {adminSidebarItems.map(item => {
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
  )
}
