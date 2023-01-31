import BellIcon from '@heroicons/react/solid/BellIcon'

import { Avatar } from '../Avatar'
import { Media } from './Media'

export default {
  title: 'Elements/Media',
  component: Media,
}

export const Template = (args: any) => <Media icon={<BellIcon />} {...args} />
Template.args = {
  title: 'Lorem ipsum',
  description:
    'Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.',
}

export const WithAvatar = (args: any) => (
  <Media
    icon={
      <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
    }
    title="Lorem ipsum"
    description="Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto."
  />
)

export const NoDescription = (args: any) => (
  <Media icon={<BellIcon />} title="Lorem ipsum" />
)
