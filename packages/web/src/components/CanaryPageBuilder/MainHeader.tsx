import { FC, useMemo } from 'react'

import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import DocumentIcon from '@heroicons/react/outline/DocumentIcon'
import PaperClipIcon from '@heroicons/react/outline/PaperClipIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import ChevronDownIcon from '@heroicons/react/solid/ChevronDownIcon'
import SparklesIcon from '@heroicons/react/solid/SparklesIcon'
import { Link } from 'react-router-dom'

import { Page, PageType, Space } from '@tribeplatform/gql-client/types'
import { useSpaces } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { NavigationalDropdown } from '@tribeplatform/react-ui-kit/NavigationalDropdown'

import { SpaceImage } from '../Space/SpaceImage'
import { Route, RouteType } from './types'

export const MainHeader: FC<{
  pages: Page[]
  onRouteChange: (item) => void
  route: Route
}> = ({ onRouteChange, route, pages }) => {
  const { data: spacesPages } = useSpaces({
    fields: {
      image: 'basic',
    },
    variables: {
      limit: 20,
    },
  })

  const navDropdown = useMemo(() => {
    const spaces = (
      simplifyPaginatedResult<Space>(spacesPages)?.nodes || []
    ).map(space => ({
      value: { path: `/${space.slug}`, entityType: RouteType.SPACE } as Route,
      title: space.name,
      icon: <SpaceImage space={space} size="xs" />,
    }))

    return [
      {
        icon: <PaperClipIcon />,
        title: 'Pages',
        page: {
          title: 'DEFAULT PAGES',
          items: pages
            .filter(p => p.type !== PageType.ENTITY)
            .map(page => ({
              value: {
                path: page.address.path,
                entityType: RouteType.PAGE,
              } as Route,
              title: page.seoDetail.title,
              icon: <DocumentIcon />,
            })),
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
        value: { path: '/theme', entityType: RouteType.THEME } as Route,
        icon: <SparklesIcon />,
        title: 'Customize Theme',
      },
    ]
  }, [spacesPages, pages])

  return (
    <div className="flex justify-between">
      <div className="flex space-x-3">
        <Button
          as={Link}
          to="/"
          size="xs"
          variant="outline"
          leadingIcon={<ArrowLeftIcon />}
        >
          Back
        </Button>
        <NavigationalDropdown
          items={navDropdown}
          onClick={onRouteChange}
          value={route}
          trigger={({ selectedItem }) => (
            <Button
              size="xs"
              variant="outline"
              leadingIcon={selectedItem?.icon}
              trailingIcon={<ChevronDownIcon />}
            >
              {selectedItem?.title}
            </Button>
          )}
        />
      </div>
    </div>
  )
}
