import CollectionIcon from '@heroicons/react/outline/CollectionIcon'
import DocumentIcon from '@heroicons/react/outline/DocumentIcon'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import MapIcon from '@heroicons/react/outline/MapIcon'
import PaperClipIcon from '@heroicons/react/outline/PaperClipIcon'
import SparklesIcon from '@heroicons/react/outline/SparklesIcon'
import UserGroupIcon from '@heroicons/react/outline/UserGroupIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import { Emoji } from 'emoji-mart-virtualized'

import { NavigationalDropdown, Item } from './NavigationalDropdown'

export default {
  title: 'Elements/NavigationalDropdown',
  component: NavigationalDropdown,
}

const pages = [
  {
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    title: 'Explore',
    icon: <MapIcon />,
  },
  {
    title: 'Spaces',
    icon: <CollectionIcon />,
  },
  {
    title: 'Members',
    icon: <UserGroupIcon />,
  },
  {
    title: 'Login',
    icon: <DocumentIcon />,
  },
  {
    title: 'Sign Up',
    icon: <DocumentIcon />,
  },
  {
    title: '404',
    icon: <DocumentIcon />,
  },
  {
    title: 'Forgot Password',
    icon: <DocumentIcon />,
  },
  {
    title: 'Privacy Policy',
    icon: <DocumentIcon />,
  },
]
const spaces = [
  ...new Array(10).fill({
    title: 'Success Stories',
    icon: (
      <div className="flex items-center justify-center">
        <Emoji native emoji={`:${'smile'}:`} size={20} />
      </div>
    ),
  }),
]
const navDropdown: Item[] = [
  {
    icon: <PaperClipIcon />,
    title: 'Pages',
    page: {
      title: 'DEFAULT PAGES',
      items: pages,
    },
  },
  {
    icon: <ViewGridIcon />,
    title: 'Spaces',
    page: {
      items: spaces,
    },
  },
  {
    icon: <SparklesIcon />,
    title: 'Customize Theme',
  },
]

export const Simple = (args: any) => {
  return <NavigationalDropdown items={navDropdown} />
}

export const WithCustomTrigger = (args: any) => {
  return (
    <NavigationalDropdown
      items={navDropdown}
      trigger={
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
        >
          I&apos;m a Custom Trigger
        </button>
      }
    />
  )
}
