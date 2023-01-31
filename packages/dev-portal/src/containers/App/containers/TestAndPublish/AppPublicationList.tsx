import DocumentIcon from '@heroicons/react/outline/DocumentIcon'

import { PluralNetwork, RoleType } from '@tribeplatform/gql-client/types'
import {
  useGlobalAppPublications,
  useGlobalNetworks,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'
import { List } from '@tribeplatform/react-ui-kit/Layout'

import { AppPublicationListItem } from './AppPublicationListItem'

export const AppPublicationList = ({ app }) => {
  const { data, isLoading } = useGlobalNetworks({
    variables: {
      limit: 20,
      roleType: RoleType.ADMIN,
    },
    fields: { logo: 'basic', subscriptionPlan: 'basic' },
  })
  const { nodes: networks } = simplifyPaginatedResult<PluralNetwork>(data)

  const { data: publications, isLoading: isLoadingPublications } =
    useGlobalAppPublications({
      variables: {
        appId: app.id,
      },
    })

  const onCreate = () => {
    window.open('https://tribe.so/create', '_blank')
  }

  return (
    <List divider>
      {networks?.map(network => (
        <List.Item key={network.name}>
          <AppPublicationListItem
            network={network}
            app={app}
            loadingPublication={isLoadingPublications}
            publication={
              publications?.find(it => it.networkId === network.id) || null
            }
          />
        </List.Item>
      ))}
      {!isLoading && networks.length === 0 && (
        <List.Item>
          <EmptyState
            title="You are not an admin of any communities"
            description="In order to publish an app, please first create a community"
            icon={<DocumentIcon />}
          >
            <Button onClick={onCreate} variant="primary">
              Create your tribe
            </Button>
          </EmptyState>
        </List.Item>
      )}
      {isLoading ? <AppPublicationListLoading /> : null}
    </List>
  )
}

export const AppPublicationListLoading = ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={i}>
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="rounded-full bg-surface-300 h-8 w-8" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
            </div>
          </div>
        </List.Item>
      ))}
    </>
  )
}
