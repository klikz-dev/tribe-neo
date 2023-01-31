import { Form } from '@tribeplatform/react-sdk/components'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { AppSettingsProps } from '../types'

const GA_TRACKING_ID_REGEX = /^(UA-\d+-\d+|G-[A-Z0-9]+)$/

export const GoogleAnalyticsSettings = ({
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
              settings: JSON.stringify({ measurementId: data?.measurementId }),
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
          <h3>Tracking ID</h3>
          {appSettings && !appSettings?.measurementId && (
            <Alert
              status="warning"
              title="You need to update your tracking ID to receive data in Analytics"
            />
          )}
          <Form.Input
            name="measurementId"
            label="Google Universal Analytics Tracking ID"
            placeHolder="i.e. UA-000000-2"
            validation={{
              pattern: {
                value: GA_TRACKING_ID_REGEX,
                message: 'Invalid Tracking ID Format',
              },
            }}
          />
          <p>
            Don&apos;t know how to get Tracking ID?{' '}
            <Link
              href="https://support.google.com/analytics/answer/1008015?hl=en"
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
