import { Link as RouterLink } from 'wouter'

import { App } from '@tribeplatform/gql-client/types'
import { useGlobalApps } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Container, GridList } from '@tribeplatform/react-ui-kit/Layout'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { AppCard, CreateAppCard } from './components'

export const AppsContainer = () => {
  const { data, isLoading } = useGlobalApps({
    variables: {
      limit: 30,
    },
    fields: { image: 'basic' },
  })
  const { nodes: apps } = simplifyPaginatedResult<App>(data)

  return (
    <Container className="pt-5 sm:pt-7">
      <PageHeader
        title="Your apps"
        description="Build custom apps on the Tribe platform through the developer toolkit. At the moment, custom apps are only available for use within your own communities."
        padding="md"
      />
      <GridList columns={4}>
        <GridList.Item>
          <Link as={RouterLink} href="/apps/create">
            <CreateAppCard />
          </Link>
        </GridList.Item>

        {isLoading && <AppGridLoading />}

        {apps?.map(app => (
          <GridList.Item key={app.id}>
            <Link as={RouterLink} href={`/apps/${app?.slug}/information`}>
              <AppCard app={app} />
            </Link>
          </GridList.Item>
        ))}
      </GridList>
    </Container>
  )
}

export const AppGridLoading = ({ count = 4 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="bg-surface-50 px-4 py-6 shadow sm:p-6 sm:rounded-lg"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-surface-300 h-12 w-12" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-surface-300 rounded-full" />
                <div className="h-4 bg-surface-300 rounded-full w-5/6" />
                <div className="h-4 bg-surface-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
