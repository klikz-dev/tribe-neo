import PlusIcon from '@heroicons/react/solid/PlusIcon'

import { Avatar } from './Avatar'
import { AvatarGroup } from './AvatarGroup'
import { AvatarWithBottomText, AvatarWithText } from './AvatarWithText'

export default {
  title: 'Elements/Avatar',
  component: Avatar,
}

export const Template = (args: any) => <Avatar {...args} />
Template.args = {
  size: 'md',
  src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export const Sizes = (args: any) => (
  <div className="space-x-4">
    <Avatar {...args} size="xs" />
    <Avatar {...args} size="sm" />
    <Avatar {...args} size="md" />
    <Avatar {...args} size="lg" />
    <Avatar {...args} size="xl" />
    <Avatar {...args} size="2xl" />
    <Avatar {...args} size="3xl" />
  </div>
)

Sizes.args = {
  src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const GroupTemplate = (args: any) => (
  <AvatarGroup {...args}>
    <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
    <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
    <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
    <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
  </AvatarGroup>
)

GroupTemplate.args = {}

export const AvatarGroups = () => (
  <div className="space-y-4">
    <GroupTemplate size="xs" />
    <GroupTemplate size="sm" />
    <GroupTemplate size="md" />
    <GroupTemplate size="lg" />
    <GroupTemplate size="xl" />
  </div>
)

export const AvatarGroupsWithMoreIndicator = () => (
  <div className="space-y-4">
    <GroupTemplate size="xs" moreCount={5} />
    <GroupTemplate size="sm" moreCount={5} />
    <GroupTemplate size="md" moreCount={5} />
    <GroupTemplate size="lg" moreCount={5} />
    <GroupTemplate size="xl" moreCount={5} />
  </div>
)

export const WithPlaceholderIcon = () => <Sizes src={undefined} />

export const WithPlaceholderInitials = () => (
  <Sizes src={undefined} name="Cristiano Ronaldo" />
)

export const WithStatus = () => (
  <div className="space-y-4">
    <Sizes
      {...Sizes.args}
      icon={
        <div className="bg-success-400 h-full w-full rounded-full ring-2 ring-surface-50" />
      }
    />
  </div>
)

export const WithIcon = (args: any) => (
  <div className="space-x-4">
    <Avatar
      {...Template.args}
      size="md"
      icon={
        <PlusIcon className="rounded-full ring-2 ring-surface-50 text-basicPrimary-500 bg-actionPrimary-500 " />
      }
    />
    <Avatar
      {...Template.args}
      size="lg"
      icon={
        <PlusIcon className="rounded-full ring-2 ring-surface-50 text-basicPrimary-500 bg-actionPrimary-500 " />
      }
    />
    <Avatar
      {...Template.args}
      size="xl"
      icon={
        <PlusIcon className="rounded-full ring-2 ring-surface-50 text-basicPrimary-500 bg-actionPrimary-500 " />
      }
    />
  </div>
)

export const WithText = (args: any) => (
  <AvatarWithText
    {...args}
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    name="Tom Cook"
    description="View profile"
  />
)

export const WithBottomText = (args: any) => (
  <AvatarWithBottomText
    {...args}
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    name="Tom Cook"
    description="View profile"
  />
)
