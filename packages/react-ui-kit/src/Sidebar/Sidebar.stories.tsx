import ChartBarIcon from '@heroicons/react/outline/ChartBarIcon'
import FolderIcon from '@heroicons/react/outline/FolderIcon'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import UsersIcon from '@heroicons/react/outline/UsersIcon'

import { Link } from '../Link'
import { NavVertical } from './NavVertical'
import { Sidebar } from './Sidebar'

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => <div className="h-screen flex bg-main-100">{Story()}</div>,
  ],
}

export const Template = (args: any) => {
  return (
    <Sidebar {...args}>
      <Sidebar.Header>
        <img
          className="h-8 w-auto"
          src="https://tribe.so/webflow-v2/images/TribeLogo.svg"
          alt=""
        />
      </Sidebar.Header>
      <Sidebar.Content>
        <NavVertical>
          <NavVertical.Group>
            <NavVertical.Item href="#" leadingIcon={<HomeIcon />} active>
              Dashboard
            </NavVertical.Item>
            <NavVertical.Item href="#" leadingIcon={<UsersIcon />}>
              Team
            </NavVertical.Item>
            <NavVertical.Item href="#" leadingIcon={<FolderIcon />}>
              Projects
            </NavVertical.Item>
            <NavVertical.Item href="#" leadingIcon={<ChartBarIcon />}>
              Reports
            </NavVertical.Item>
          </NavVertical.Group>
        </NavVertical>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Link href="#" className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-basicSurface-700 group-hover:text-basicSurface-900">
                Tom Cook
              </p>
              <p className="text-xs font-medium text-basicSurface-500 group-hover:text-basicSurface-700">
                View profile
              </p>
            </div>
          </div>
        </Link>
      </Sidebar.Footer>
    </Sidebar>
  )
}
