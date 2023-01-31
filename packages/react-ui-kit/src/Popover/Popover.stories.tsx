import 'emoji-mart-virtualized/css/emoji-mart.css'

import { useState } from 'react'

import BookmarkAltIcon from '@heroicons/react/outline/BookmarkAltIcon'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import PhoneIcon from '@heroicons/react/outline/PhoneIcon'
import PlayIcon from '@heroicons/react/outline/PlayIcon'
import ShieldCheckIcon from '@heroicons/react/outline/ShieldCheckIcon'
import SupportIcon from '@heroicons/react/outline/SupportIcon'
import { Picker } from 'emoji-mart-virtualized'

import { Button } from '../Button'
import { Link } from '../Link'
import { Tabs } from '../Tabs'
import { Popover } from './Popover'
import { POPOVER_PADDINGS, POPOVER_TRIGGER_TYPE } from './PopoverContext'

export default {
  title: 'Elements/Popover',
  component: Popover,
  argTypes: {
    padding: {
      options: POPOVER_PADDINGS,
      control: { type: 'radio' },
    },
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    trigger: {
      options: POPOVER_TRIGGER_TYPE,
      control: { type: 'radio' },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

const solutions = [
  {
    name: 'Blog',
    description: 'Learn about tips, product updates and company culture.',
    href: '#',
  },
  {
    name: 'Help Center',
    description:
      'Get all of your questions answered in our forums of contact support.',
    href: '#',
  },
  {
    name: 'Guides',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '#',
  },
  {
    name: 'Events',
    description:
      'Check out webinars with experts and learn about our annual conference.',
    href: '#',
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]

export const Template = (args: any) => (
  <Popover {...args}>
    <Popover.Trigger>{args.triggerText}</Popover.Trigger>
    <Popover.Panel>
      <Popover.Content>{args.children}</Popover.Content>
    </Popover.Panel>
  </Popover>
)

Template.args = {
  triggerText: 'Trigger',
  trigger: 'click',
  children: 'Content',
  padding: 'md',
  rounded: false,
}

export const Rounded = (args: any) => (
  <Popover {...args}>
    <Popover.Trigger>Trigger</Popover.Trigger>
    <Popover.Panel rounded>
      <Popover.Content>Content</Popover.Content>
    </Popover.Panel>
  </Popover>
)

export const WithTab = (args: any) => (
  <Popover {...args}>
    <Popover.Trigger>Trigger</Popover.Trigger>
    <Popover.Panel>
      <Popover.Content>
        <Tabs.Group>
          <Tabs.List size="md">
            <Tabs.Tab name="emoji">Emoji</Tabs.Tab>
            <Tabs.Tab name="Company">Company</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel>
              <Picker
                style={{ border: 0, width: '100%' }}
                native
                set="apple"
                showSkinTones={false}
                showPreview
                onSelect={emoji => {
                  console.log({ emoji })
                }}
              />
            </Tabs.Panel>
            <Tabs.Panel>Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs.Group>
      </Popover.Content>
    </Popover.Panel>
  </Popover>
)

export const OnHover = (args: any) => (
  <Popover trigger="hover" {...args}>
    <Popover.Trigger>Hover me</Popover.Trigger>
    <Popover.Panel>
      <Popover.Content>Content</Popover.Content>
    </Popover.Panel>
  </Popover>
)

export const OpenedExternally = (args: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)}>External Toggle</Button>

      <div className="flex h-screen">
        <div className="m-auto">
          <Popover visible={open} {...args}>
            <Popover.TriggerMinimal>
              {/* make trigger invisible to position panel where you want it */}
              <div className="opacity-25">Position</div>
            </Popover.TriggerMinimal>
            <Popover.Panel>
              <Popover.Content>Content</Popover.Content>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </>
  )
}
OpenedExternally.parameters = {
  layout: 'padded',
}

export const Interactive = (args: any) => {
  const [count, setCount] = useState(0)

  return (
    <Popover trigger="hover" interactive {...args}>
      <Popover.Trigger>Hover me</Popover.Trigger>
      <Popover.Panel>
        {({ close }) => (
          <Popover.Content>
            <p>You clicked {count} times</p>
            <Button variant="outline" onClick={() => setCount(count + 1)}>
              Click me
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCount(count + 1)
                close()
              }}
            >
              click me and close
            </Button>
          </Popover.Content>
        )}
      </Popover.Panel>
    </Popover>
  )
}

const WithPlacement = ({ placement }) => (
  <div className="w-min">
    <Popover placement={placement} trigger="hover">
      <Popover.Trigger>{placement}</Popover.Trigger>
      <Popover.Panel>
        <Popover.Content>Popover on {placement}</Popover.Content>
      </Popover.Panel>
    </Popover>
  </div>
)

export const Placement = () => (
  <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
    <div></div>
    <WithPlacement placement="left" />
    <div></div>
    <WithPlacement placement="top" />
    <div></div>
    <WithPlacement placement="bottom" />
    <div></div>
    <WithPlacement placement="right" />
    <div></div>
  </div>
)

export const FlyoutMenu = (args: any) => (
  <Popover {...args}>
    <Popover.Trigger>Solutions</Popover.Trigger>
    <Popover.Panel className="max-w-xs">
      <Popover.Content className="grid gap-6">
        {solutions.map(item => (
          <Link
            key={item.name}
            href={item.href}
            variant="inherit"
            className="-m-3 p-3 block rounded-md bg-surface-50 hover:bg-surface-100 transition ease-in-out duration-150"
          >
            <p className="text-base font-medium text-basicSurface-900">
              {item.name}
            </p>
            <p className="mt-1 text-sm text-basicSurface-500">
              {item.description}
            </p>
          </Link>
        ))}
      </Popover.Content>
    </Popover.Panel>
  </Popover>
)

export const WithFooterActions = (args: any) => (
  <Popover {...args}>
    <Popover.Trigger>Solutions</Popover.Trigger>
    <Popover.Panel className="max-w-md ">
      <Popover.Content>
        {solutions.map(item => (
          <Link
            key={item.name}
            href={item.href}
            variant="inherit"
            className="-m-3 p-3 block rounded-md bg-surface-50 hover:bg-surface-100 transition ease-in-out duration-150"
          >
            <p className="text-base font-medium text-basicSurface-900">
              {item.name}
            </p>
            <p className="mt-1 text-sm text-basicSurface-500">
              {item.description}
            </p>
          </Link>
        ))}
      </Popover.Content>
      <Popover.Footer className="sm:flex space-y-6 sm:space-y-0 sm:space-x-10">
        {callsToAction.map(item => (
          <div key={item.name} className="flow-root">
            <Link
              href={item.href}
              variant="inherit"
              className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-basicSurface-900 hover:bg-surface-200 transition ease-in-out duration-150"
            >
              <item.icon
                className="flex-shrink-0 h-6 w-6 text-basicSurface-400"
                aria-hidden="true"
              />
              <span className="ml-3">{item.name}</span>
            </Link>
          </div>
        ))}
      </Popover.Footer>
    </Popover.Panel>
  </Popover>
)

const resources = [
  {
    name: 'Help Center',
    description:
      'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description:
      'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  {
    name: 'Security',
    description: 'Understand how we take your privacy seriously.',
    href: '#',
    icon: ShieldCheckIcon,
  },
]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
  },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

export const StackedWithFooterList = (args: any) => (
  <Popover {...args}>
    <Popover.Trigger>Resources</Popover.Trigger>
    <Popover.Panel>
      <Popover.Content>
        {resources.map(item => (
          <Link
            key={item.name}
            href={item.href}
            variant="inherit"
            className="-m-3 p-3 flex items-start rounded-lg bg-surface-50 hover:bg-surface-100 transition ease-in-out duration-150"
          >
            <item.icon
              className="flex-shrink-0 h-6 w-6 text-actionPrimary-600"
              aria-hidden="true"
            />
            <div className="ml-4">
              <p className="text-base font-medium text-basicSurface-900">
                {item.name}
              </p>
              <p className="mt-1 text-sm text-basicSurface-500">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </Popover.Content>
      <Popover.Footer>
        <div>
          <h3 className="text-sm tracking-wide font-medium text-basicSurface-500 uppercase">
            Recent Posts
          </h3>
          <ul className="mt-4 space-y-4">
            {recentPosts.map(post => (
              <li key={post.id} className="text-base truncate">
                <Link
                  variant="inherit"
                  href={post.href}
                  className="font-medium text-basicSurface-900 hover:text-basicSurface-700 transition ease-in-out duration-150"
                >
                  {post.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 text-sm">
          <Link href="#">
            View all posts <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Popover.Footer>
    </Popover.Panel>
  </Popover>
)
