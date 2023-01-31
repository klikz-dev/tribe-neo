import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'

import { App, AppInstallation } from '@tribeplatform/gql-client/types'
import { useAppInstallations, useApps } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { GridList } from '@tribeplatform/react-ui-kit/Layout'

import { AppCard } from './AppCard'

export const Apps = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useApps({
    variables: {
      limit: 10,
    },
    fields: {
      image: 'all',
    },
  })
  const { data: appInstallationsData } = useAppInstallations({
    variables: {
      limit: 10,
    },
    fields: {
      app: 'basic',
    },
  })

  const { nodes: appInstallations } =
    simplifyPaginatedResult<AppInstallation>(appInstallationsData)
  const { nodes: apps } = simplifyPaginatedResult<App>(data)

  const findAppInstallation = (appId: string) =>
    appInstallations.find(appInstallation => appInstallation?.app?.id === appId)

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
      hasMore={hasNextPage || isLoading}
      threshold={800}
      // loader={<PendingPostsLoading />}
      useWindow={false}
    >
      <h3 className="mb-3">All Apps</h3>
      <GridList columns={3}>
        {apps?.map(app => (
          <GridList.Item key={app?.id}>
            <Link to={`/admin/network/apps/${app?.slug}`}>
              <AppCard
                app={app}
                appInstallation={findAppInstallation(app?.id)}
              />
            </Link>
          </GridList.Item>
        ))}
      </GridList>
    </InfiniteScroll>
  )
}
