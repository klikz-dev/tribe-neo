import ArrowLeftIcon from '@heroicons/react/outline/ArrowLeftIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import { matchPath, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import { AppInstallation, Image } from '@tribeplatform/gql-client/types'
import { useAppInstallations } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'

export const AppsSidebarContent = () => {
  const location = useLocation()

  const { data: appInstallationsData } = useAppInstallations({
    variables: {
      limit: 10,
    },
    fields: {
      app: {
        image: 'all',
      },
    },
  })
  const { nodes: appInstallations } =
    simplifyPaginatedResult<AppInstallation>(appInstallationsData)

  return (
    <NavVertical className="px-2">
      <NavVertical.Group>
        <NavVertical.Item
          active={false}
          as={Link}
          leadingIcon={<ArrowLeftIcon />}
          to="/admin/network/settings"
        >
          Back to Administration
        </NavVertical.Item>
        <NavVertical.Item
          active={matchPath(location.pathname, {
            path: '/admin/network/apps',
            exact: true,
          })}
          as={Link}
          leadingIcon={<ViewGridIcon />}
          to="/admin/network/apps"
        >
          All apps
        </NavVertical.Item>
        {appInstallations?.map(appInstallation => (
          <NavVertical.Item
            active={matchPath(location.pathname, {
              path: `/admin/network/apps/${appInstallation?.app?.slug}`,
              exact: true,
            })}
            as={Link}
            leadingIcon={
              <Avatar
                size="sm"
                name={appInstallation?.app?.name}
                src={(appInstallation?.app?.image as Image)?.url}
              />
            }
            to={`/admin/network/apps/${appInstallation?.app?.slug}`}
            key={appInstallation.id}
          >
            {appInstallation.app.name}
          </NavVertical.Item>
        ))}
      </NavVertical.Group>
    </NavVertical>
  )
}
