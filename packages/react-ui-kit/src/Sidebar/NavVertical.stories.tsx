import ChartBarIcon from '@heroicons/react/outline/ChartBarIcon'
import FolderIcon from '@heroicons/react/outline/FolderIcon'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import UsersIcon from '@heroicons/react/outline/UsersIcon'

import { Accordion } from '../Accordion'
import { NavVertical } from './NavVertical'

export default {
  title: 'Navigation/Vertical',
  component: NavVertical,
  decorators: [Story => <div className="max-w-xs">{Story()}</div>],
}

export const Template = (args: any) => {
  return (
    <NavVertical {...args}>
      <NavVertical.Group>
        <NavVertical.Item active href="#">
          Dashboard
        </NavVertical.Item>
        <NavVertical.Item href="#">Team</NavVertical.Item>
        <NavVertical.Item href="#">Projects</NavVertical.Item>
        <NavVertical.Item href="#">Reports</NavVertical.Item>
      </NavVertical.Group>
    </NavVertical>
  )
}

export const WithIcons = (args: any) => {
  return (
    <NavVertical {...args}>
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
  )
}

export const WithExpandableSection = (args: any) => {
  return (
    <NavVertical {...args}>
      <NavVertical.Group>
        <NavVertical.Item href="#" leadingIcon={<HomeIcon />} active>
          Dashboard
        </NavVertical.Item>
        <Accordion>
          <Accordion.Button>Team</Accordion.Button>
          <Accordion.Panel>
            <NavVertical.Item href="#">Overview</NavVertical.Item>
            <NavVertical.Item href="#">Members</NavVertical.Item>
            <NavVertical.Item href="#">Settings</NavVertical.Item>
          </Accordion.Panel>
        </Accordion>
      </NavVertical.Group>
    </NavVertical>
  )
}

export const WithSecondaryNavigation = (args: any) => {
  return (
    <NavVertical {...args}>
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
      <NavVertical.Group>
        <NavVertical.GroupHeader>Projects</NavVertical.GroupHeader>
        <NavVertical.ItemSecondary href="#">
          Website redesign
        </NavVertical.ItemSecondary>
        <NavVertical.ItemSecondary href="#">
          GraphQL API
        </NavVertical.ItemSecondary>
        <NavVertical.ItemSecondary href="#">
          Customer migration guides
        </NavVertical.ItemSecondary>
      </NavVertical.Group>
    </NavVertical>
  )
}
