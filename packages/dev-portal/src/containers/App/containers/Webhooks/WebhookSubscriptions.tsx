import { Form } from '@tribeplatform/react-sdk/components'
import { useGlobalUpdateApp } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { WebhookEventsSelect } from './WebhookEventsSelect'

export const WebhookSubscriptions = ({ app }) => {
  const { mutate: updateApp, isLoading: isUpdating } = useGlobalUpdateApp()

  const onSubmit = data => {
    updateApp({
      id: app.id,
      input: {
        webhookSubscriptions: data.webhookSubscriptions,
      },
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={{
        webhookSubscriptions: app?.webhookSubscriptions || [],
      }}
      className="space-y-5"
    >
      <WebhookEventsSelect
        label="Community events"
        name="webhookSubscriptions"
        validation={{ required: 'Please select an event' }}
      />
      <div className="sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
        <Button loading={isUpdating} variant="primary" type="submit">
          Update
        </Button>
      </div>
    </Form>
  )
}
