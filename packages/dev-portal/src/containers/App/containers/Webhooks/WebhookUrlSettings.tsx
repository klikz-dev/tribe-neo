import { useState } from 'react'

import { ActionStatus } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import {
  useGlobalTestAppWebhook,
  useGlobalUpdateApp,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { WebhookTestRequestDoc } from './WebhookTestRequestDoc'

export const WebhookUrlSettings = ({ app }) => {
  const { mutateAsync: sendTestRequest, isLoading: isTestRequestLoading } =
    useGlobalTestAppWebhook()
  const { mutateAsync: updateApp, isLoading: isUpdating } = useGlobalUpdateApp()
  const [docsModalOpen, setDocsModalOpen] = useState(false)

  const onSubmit = async data => {
    await updateApp({
      id: app.id,
      input: {
        webhookUrl: data.webhookUrl,
      },
    })
  }

  const onSendRequest = async url => {
    await sendTestRequest(
      {
        appId: app.id,
        input: {
          webhookUrl: url,
        },
      },
      {
        onSuccess: data => {
          if (data.status === ActionStatus.SUCCEEDED) {
            toast({
              title: 'Success',
              description: 'Test request is successful',
              status: 'success',
            })
          } else {
            toast({
              title: 'Error',
              description: 'Test request failed',
              status: 'error',
            })
          }
        },
      },
    )
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        defaultValues={{
          webhookUrl: app.webhookUrl,
        }}
        className="space-y-5"
      >
        {methods => (
          <>
            <Form.Input
              label="URL"
              name="webhookUrl"
              validation={{
                required: "This field can't be empty",
              }}
              placeholder="https://"
              helperText="We’ll send HTTP POST requests to this URL when events occur. As soon as you enter a URL, we’ll send a request with a challenge parameter, and your endpoint must respond with the challenge value."
            />
            <Link className="text-sm" onClick={() => setDocsModalOpen(true)}>
              Learn more.
            </Link>

            <div className="sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
              <Button loading={isUpdating} variant="primary" type="submit">
                Update
              </Button>
              <Button
                onClick={() => onSendRequest(methods.getValues('webhookUrl'))}
                variant="outline"
                loading={isTestRequestLoading}
              >
                Send test request
              </Button>
            </div>
          </>
        )}
      </Form>
      <Modal
        open={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
        size="5xl"
      >
        <Modal.Header
          title="Request endpoint URL verification"
          description="Verifies ownership of endpoint URL"
        />
        <Modal.Content>
          <WebhookTestRequestDoc />
        </Modal.Content>
      </Modal>
    </>
  )
}
