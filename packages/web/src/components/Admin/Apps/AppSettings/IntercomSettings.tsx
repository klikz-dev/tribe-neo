import { Form } from '@tribeplatform/react-sdk/components'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { AppSettingsProps } from '../types'

export const IntercomSettings = ({
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
              settings: JSON.stringify({
                userIdentitySecret: data?.userIdentitySecret,
                intercomAppId: data?.intercomAppId,
                intercomUserPrefix: data?.intercomUserPrefix,
                intercomEventPrefix: data?.intercomEventPrefix,
              }),
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
          <h3>Intercom Settings</h3>
          <h4>Intercom Authentication</h4>
          {appSettings && !appSettings?.isIntercomAuthenticated && (
            <Alert
              status="warning"
              title="You need to authenticate Intercom to activate this integration"
            />
          )}
          {appSettings?.isIntercomAuthenticated && (
            <Alert
              status="success"
              title="Intercom is successfully authenticated."
            />
          )}
          <Button variant="outline" className="justify-center">
            {appSettings?.isIntercomAuthenticated
              ? 'Re-authenticate with Intercom'
              : 'Authenticate with Intercom'}
          </Button>
          <Form.Input
            name="intercomAppId"
            label="App ID"
            placeholder="i.e. cvt6rup59"
            validation={{
              required: true,
            }}
          />
          <p>
            Don&apos;t know how to get Intercom app ID?{' '}
            <Link
              href="https://www.intercom.com/help/en/articles/3539-where-can-i-find-my-workspace-id-app-id"
              external
            >
              Click here for instructions
            </Link>
          </p>
          <Form.Input
            name="userIdentitySecret"
            label="Identity verification secret"
            placeholder="i.e. 8eea23352c68a5ad8dd233f8aef142a1"
          />
          <p>
            Don&apos;t know how to get Intercom Identity verification secret?{' '}
            <Link
              href="https://developers.intercom.com/installing-intercom/docs/enable-identity-verification-on-your-web-product"
              external
            >
              Click here for instructions
            </Link>
          </p>
          <Form.Input
            name="intercomUserPrefix"
            label="User Properties Prefix"
            placeholder="i.e. Community"
          />
          <p>
            You can add a prefix to Tribe properties to make sure they
            don&apos;t mix up with yours.
          </p>
          <Form.Input
            name="intercomEventPrefix"
            label="User Events Prefix"
            placeholder="i.e. tribe-community"
          />
          <p>
            You can add a prefix to Tribe events to make sure they don&apos;t
            mix up with yours.
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
