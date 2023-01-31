import { useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { WebhookSubscriptions } from './WebhookSubscriptions'
import { WebhookUrlSettings } from './WebhookUrlSettings'

export const Webhooks = () => {
  const [, params] = useRoute('/apps/:appSlug/webhooks')
  const { data: app } = useGlobalApp({
    variables: { slug: params?.appSlug },
  })

  if (!app) {
    return null
  }

  return (
    <>
      <PageHeader padding="md" title="Webhooks" />

      <Card>
        <Card.Header
          title="Request endpoint URL"
          description="A HTTP POST request will be sent to this URL for every topic that you set up."
          withBorder
        />
        <Card.Content>
          <WebhookUrlSettings app={app} />
        </Card.Content>
        <Divider />
        <Card.Header
          title="Webhook subscriptions"
          description="Topics are types of notifications that your app can subscribe to."
        />
        <Card.Content>
          <WebhookSubscriptions app={app} />
        </Card.Content>
      </Card>
    </>
  )
}
