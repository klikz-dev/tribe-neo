import { useParams } from 'react-router-dom'

import { AppInstallation } from '@tribeplatform/gql-client/types'
import { useApp, useAppInstallations } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Tabs } from '@tribeplatform/react-ui-kit/Tabs'

import { AppAbout } from './AppAbout'
import { AppHeader } from './AppHeader'
import { AppHighlights } from './AppHighlights'
import { AppSettings } from './AppSettings'

export const AppPage = () => {
  const { appSlug } = useParams<{ appSlug: string }>()
  const { data: app } = useApp({
    variables: {
      slug: appSlug,
    },
    fields: {
      image: 'all',
      banner: 'all',
    },
  })
  const { data: appInstallationsData } = useAppInstallations({
    variables: {
      limit: 10,
    },
    fields: {
      app: 'basic',
      installedBy: 'basic',
    },
  })

  const { nodes: appInstallations } =
    simplifyPaginatedResult<AppInstallation>(appInstallationsData)
  const appInstallation = appInstallations.find(
    installation => installation.app.slug === appSlug,
  )

  return (
    <>
      <AppHeader app={app} appInstallation={appInstallation} />
      <div className="flex space-x-5">
        <div className="flex-grow">
          {appInstallation ? (
            <Tabs.Group defaultIndex={1}>
              <Tabs.List fullWidth>
                <Tabs.Tab>About</Tabs.Tab>
                <Tabs.Tab>Settings</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panels>
                <Tabs.Panel>
                  <AppAbout app={app} />
                </Tabs.Panel>
                <Tabs.Panel>
                  <AppSettings app={app} />
                </Tabs.Panel>
              </Tabs.Panels>
            </Tabs.Group>
          ) : (
            <AppAbout app={app} />
          )}
        </div>
        <div>
          <AppHighlights app={app} appInstallation={appInstallation} />
        </div>
      </div>
    </>
  )
}
