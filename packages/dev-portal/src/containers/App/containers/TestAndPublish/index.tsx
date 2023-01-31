import { useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { AppPublicationList } from './AppPublicationList'

export const TestAndPublish = () => {
  const [, params] = useRoute('/apps/:appSlug/test-and-publish')
  const { data: app } = useGlobalApp({
    variables: { slug: params?.appSlug },
  })

  if (!app) {
    return null
  }

  return (
    <>
      <PageHeader padding="md" title="Test and publish" />
      <Card>
        <Card.Header
          title="Distribution"
          description="Select the communities you want to distribute your app to"
          withBorder
        />
        <Card.Content>
          <AppPublicationList app={app} />
        </Card.Content>
      </Card>
    </>
  )
}
