import { useState } from 'react'

import dayjs from 'dayjs'
import { useClipboard } from 'use-clipboard-copy'
import { useRoute } from 'wouter'

import { useGlobalApp } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

export const Credentials = () => {
  const [, params] = useRoute('/apps/:appSlug/credentials')
  const { data: app } = useGlobalApp({ variables: { slug: params?.appSlug } })
  const clipboard = useClipboard()
  const [networkIdCopied, setNetworkIdCopied] = useState(false)

  // const { mutate: regenerateClientSecret } = useGlobalRegenerateClientSecret()

  // const onRegenerateClientSecret = () => {
  //   regenerateClientSecret({
  //     appId: app.id,
  //   })
  // }

  if (!app) {
    return null
  }

  return (
    <>
      <PageHeader padding="md" title="Credentials" />

      <Card>
        <Card.Header withBorder>
          These credentials allow your app to access{' '}
          <Link href="https://developers.tribeplatform.com/" external>
            Tribe’s API
          </Link>
          . They must be kept confidential and stored securely. Do not share
          your app credentials with anyone or include them in public code
          repositories.
        </Card.Header>
        <Card.Content>
          <div className="space-y-5">
            <FormControl.InputCopy
              label="Client ID"
              name="clientId"
              readOnly
              value={app?.clientId}
            />

            <FormControl.InputCopy
              label="Client secret"
              name="clientSecret"
              readOnly
              value={app?.clientSecret}
              helperText="You'll need to send this secret along with your client ID when making your request."
              hidden
            />
            <FormControl.InputCopy
              label="Signing secret"
              name="webhookSignSecret"
              readOnly
              value={app?.webhookSignSecret}
              helperText="Tribe signs the webhook requests we send you using this secret. 
              Confirm that each request comes from Tribe by verifying its unique signature."
              hidden
            />
          </div>
        </Card.Content>
        <Card.Footer withBorder>
          <span className="text-basicSurface-500">
            Created {app?.authorName && <>by {app?.authorName}</>}
            {app?.createdAt && (
              <> on {dayjs(app?.createdAt).toDate().toLocaleDateString()}</>
            )}
            {app?.globalNetwork?.name && (
              <>
                {' '}
                under{' '}
                <a target="_blank" href={`https://${app.globalNetwork.domain}`}>
                  {app.globalNetwork.name}
                </a>{' '}
                <Tooltip>
                  <Tooltip.Trigger className="inline-block">
                    <a
                      onClick={e => {
                        e.preventDefault()
                        clipboard.copy(app.globalNetwork.id)
                        setNetworkIdCopied(true)
                        setTimeout(() => setNetworkIdCopied(false), 2000)
                      }}
                      href="#"
                    >
                      ({app.globalNetwork.id})
                    </a>
                  </Tooltip.Trigger>
                  <Tooltip.Panel>
                    {networkIdCopied ? 'Copied!' : 'Copy network ID'}
                  </Tooltip.Panel>
                </Tooltip>
              </>
            )}
          </span>
        </Card.Footer>
      </Card>
    </>
  )
}
