import { Form } from '@tribeplatform/react-sdk/components'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { AppSettingsProps } from '../types'

const AMPLITUDE_API_KEY_REGEX = /^([0-9a-f]+)$/

export const AmplitudeSettings = ({
  app,
  appSettings,
  updateSettings,
  isUpdating,
}: AppSettingsProps) => {
  return (
    <Card>
      <Card.Content>
        <Form
          defaultValues={appSettings}
          onSubmit={data => {
            updateSettings({
              appId: app?.id,
              settings: JSON.stringify({ apiKey: data?.apiKey }),
            })
              .then(() => {
                toast({
                  title: 'Settings successfully updated',
                  status: 'success',
                })
              })
              .catch(() => {
                toast({
                  title: 'Error updating settings',
                  status: 'error',
                })
              })
          }}
          className="flex flex-col space-y-3"
        >
          <h3>Amplitude Settings</h3>
          {appSettings && !appSettings?.apiKey && (
            <Alert
              status="warning"
              title="You need to enter your Amplitude API key to activate this integration"
            />
          )}
          <Form.Input
            name="apiKey"
            label="Amplitude API Key"
            validation={{
              pattern: {
                value: AMPLITUDE_API_KEY_REGEX,
                message: 'Invalid API key format',
              },
            }}
          />
          <p>
            Don&apos;t know how to get Amplitude API key?{' '}
            <Link
              href="https://help.amplitude.com/hc/en-us/articles/207108137-Quick-start-guide-Create-your-organization-and-first-project"
              external
            >
              Click here for instructions
            </Link>
          </p>
          <Form.Actions>
            <Button type="submit" variant="primary" loading={isUpdating}>
              Save settings
            </Button>
          </Form.Actions>
        </Form>
      </Card.Content>
    </Card>
  )
}
