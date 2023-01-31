import { useState } from 'react'

import loadable from '@loadable/component'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { AppSettingsProps } from '../types'

export const CodeEditor = loadable(() => import('./CodeEditor'), {
  resolveComponent: module => module.CodeEditor,
  ssr: false,
})

export const CustomCodeSnippetSettings = ({
  app,
  appSettings,
  updateSettings,
  isUpdating,
}: AppSettingsProps) => {
  const [headCode, setHeadCode] = useState<string>(appSettings?.headCode)
  const [bodyCode, setBodyCode] = useState<string>(appSettings?.bodyCode)

  const submit = () => {
    updateSettings({
      appId: app.id,
      settings: JSON.stringify({
        headCode,
        bodyCode,
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
  }

  return (
    <Card>
      <Card.Content className="flex flex-col space-y-3">
        <h3>Custom Tags & Scripts</h3>
        <p>
          Custom code is sometimes needed for ultimate flexibility. Add custom
          code to the public pages of your community.
        </p>
        <Divider padding="none" />
        <h4>Custom code for &lt;head&gt;</h4>
        <CodeEditor
          initialValue={appSettings?.headCode}
          onCodeChange={setHeadCode}
          placeholder="<!-- Start Here -->"
        />
        <p>
          Tribe doesn&apos;t validate custom code for you, so be sure to check
          your code before publishing.
        </p>
        <Divider padding="none" />
        <h4>Custom code for &lt;body&gt;</h4>
        <CodeEditor
          initialValue={appSettings?.bodyCode}
          onCodeChange={setBodyCode}
          placeholder="<!-- Start Here -->"
        />
        <p>
          Tribe doesn&apos;t validate custom code for you, so be sure to check
          your code before publishing.
        </p>
        <Card.Actions>
          <Button
            variant="primary"
            type="button"
            loading={isUpdating}
            onClick={submit}
          >
            Save settings
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  )
}
