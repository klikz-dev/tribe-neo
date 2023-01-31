import DuplicateIcon from '@heroicons/react/solid/DuplicateIcon'
import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon'

import { Dropdown } from './Dropdown'

export default {
  title: 'Elements/Dropdown',
  component: Dropdown,
}

export const Template = (args: any) => (
  <Dropdown {...args}>
    <Dropdown.Button>Options</Dropdown.Button>
    <Dropdown.Items>
      <Dropdown.Item>Account settings</Dropdown.Item>
      <Dropdown.Item>Support</Dropdown.Item>
      <Dropdown.Item>License</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown.Items>
  </Dropdown>
)

export const DisabledItem = (args: any) => (
  <Dropdown {...args}>
    <Dropdown.Button>Options</Dropdown.Button>
    <Dropdown.Items>
      <Dropdown.Item>Account settings</Dropdown.Item>
      <Dropdown.Item>Documentation</Dropdown.Item>
      <Dropdown.Item disabled>Invite a friend (coming soon!)</Dropdown.Item>
    </Dropdown.Items>
  </Dropdown>
)

export const WithDividers = (args: any) => (
  <Dropdown {...args}>
    <Dropdown.Button>Options</Dropdown.Button>
    <Dropdown.Items className="divide-y divide-neutral-100">
      <div className="py-1">
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
      </div>
      <div className="py-1">
        <Dropdown.Item>Archive</Dropdown.Item>
        <Dropdown.Item>Move</Dropdown.Item>
      </div>
    </Dropdown.Items>
  </Dropdown>
)

export const WithIcons = (args: any) => (
  <Dropdown {...args}>
    <Dropdown.Button>Options</Dropdown.Button>
    <Dropdown.Items>
      <Dropdown.Item leadingIcon={<PencilAltIcon />}>Edit</Dropdown.Item>
      <Dropdown.Item leadingIcon={<DuplicateIcon />}>Duplicate</Dropdown.Item>
    </Dropdown.Items>
  </Dropdown>
)

export const WithCustomMenuIcon = (args: any) => (
  <Dropdown {...args}>
    <Dropdown.ButtonMinimal />
    <Dropdown.Items>
      <Dropdown.Item leadingIcon={<PencilAltIcon />}>Edit</Dropdown.Item>
      <Dropdown.Item leadingIcon={<DuplicateIcon />}>Duplicate</Dropdown.Item>
    </Dropdown.Items>
  </Dropdown>
)
