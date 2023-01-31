import { useState } from 'react'

import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { Input } from '../../../Input'
import { AppSettingsProps } from '../types'

export const ZapierSettings = ({
  app,
  appSettings,
  updateSettings,
  isUpdating,
}: AppSettingsProps) => {
  const [token, updateToken] = useState<string>(null)
  const hasToken = appSettings?.hasToken

  const generateToken = () => {
    updateSettings({
      appId: app.id,
      settings: JSON.stringify({
        regenerateIdentifier: true,
      }),
    })
      .then(result => {
        const updatedSettings = JSON.parse(result?.data)
        updateToken(updatedSettings?.apiToken)
      })
      .catch(() => {
        toast({
          title: 'Unable to generate API key',
          status: 'error',
        })
      })
  }

  return (
    <Card>
      <Card.Content className="flex flex-col space-y-3">
        <h3>Api Key</h3>
        <p>
          The API Key is generated only after the user clicks on “Generate API
          key“. After the user navigates away from the page, the key is hidden
          forever.
        </p>
        {hasToken && !token && (
          <Alert status="info">
            An API key exists for this site. Generating a new one invalidates
            the existing key.
          </Alert>
        )}
        {token && (
          <Alert status="warning">
            Copy your API key now, and treat it like a password.
          </Alert>
        )}
        {token && <Input trailingAddonCopy value={token} />}
        <div>
          <Button
            variant="primary"
            onClick={generateToken}
            loading={isUpdating}
          >
            Generate API key
          </Button>
        </div>
        <Divider padding="none" />
        <h3>Set up your Zapier connection</h3>
        <p>
          The easiest way is to create new zap and choose “Tribe New” under
          “Choose app & event” dropdown. After picking your trigger or action,
          click on “Sign in to Tribe” button. There you will be prompted to add
          the API Key generated in the field above.
        </p>
        <div>
          <Button variant="outline">
            <Link
              href="https://zapier.com/developer/public-invite/141233/01c08d182f7a7cda304a68067a396d71/"
              external
            >
              Open zapier.com
            </Link>
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
