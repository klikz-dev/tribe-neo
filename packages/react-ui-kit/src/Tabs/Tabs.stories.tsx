import MailIcon from '@heroicons/react/solid/MailIcon'
import PhoneIcon from '@heroicons/react/solid/PhoneIcon'
import { action } from '@storybook/addon-actions'

import { Tabs } from './Tabs'

export default {
  title: 'Elements/Tabs',
  component: Tabs,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    rounded: {
      options: ['none', 'desktop', 'all'],
      control: { type: 'radio' },
    },
  },
}

const tabs = [
  { name: 'My Account', href: '#', current: true },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: false },
]
export const Template = ({
  variant,
  size,
  fullWidth,
  rounded,
  divide,
  ...args
}) => {
  return (
    <Tabs.Group {...args} onChange={action('onChange')}>
      <Tabs.List
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        rounded={rounded}
        divide={divide}
      >
        {tabs.map(tab => (
          <Tabs.Tab key={tab.name} name={tab.name}>
            {tab.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Content 1</Tabs.Panel>
        <Tabs.Panel>Content 2</Tabs.Panel>
        <Tabs.Panel>Content 3</Tabs.Panel>
        <Tabs.Panel>Content 4</Tabs.Panel>
      </Tabs.Panels>
    </Tabs.Group>
  )
}
Template.args = {
  defaultIndex: 0,
  size: 'md',
  variant: 'bar',
  fullWidth: false,
  rounded: 'desktop',
  divide: true,
}

export const WithIcons = (args: any) => {
  return (
    <Tabs.Group {...args}>
      <Tabs.List>
        <Tabs.Tab name="Mail" leadingIcon={<MailIcon />}>
          Mail
        </Tabs.Tab>
        <Tabs.Tab name="Phone" leadingIcon={<PhoneIcon />}>
          Phone
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>Content 1</Tabs.Panel>
        <Tabs.Panel>Content 2</Tabs.Panel>
      </Tabs.Panels>
    </Tabs.Group>
  )
}

export const Sizes = (args: any) => (
  <div className="space-y-8">
    <div className="space-x-4">
      <Tabs.Group>
        <Tabs.List size="md" {...args}>
          <Tabs.Tab name="My Account">My Account</Tabs.Tab>
          <Tabs.Tab name="Company">Company</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
    </div>
    <div className="space-x-4">
      <Tabs.Group>
        <Tabs.List size="sm" {...args}>
          <Tabs.Tab name="My Account">My Account</Tabs.Tab>
          <Tabs.Tab name="Company">Company</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>
    </div>
  </div>
)

export const Pills = (args: any) => {
  return <Sizes variant="pills" />
}

export const PillsAccent = (args: any) => {
  return <Sizes variant="pills-accent" />
}
