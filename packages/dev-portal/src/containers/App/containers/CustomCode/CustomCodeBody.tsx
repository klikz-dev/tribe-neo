import { App } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useGlobalUpdateApp } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { FormCodeEditor } from '../../../../components/CodeEditor/FormCodeEditor'

type CustomCodeBodyProps = {
  app: App
}

export const CustomCodeBody = ({ app }: CustomCodeBodyProps) => {
  const { mutate: updateApp, isLoading: isUpdating } = useGlobalUpdateApp()

  const onSubmit = data => {
    const customCodes = app?.customCodes || {}
    if (data.customCodeBody) {
      customCodes.body = data.customCodeBody
    }

    updateApp({
      id: app.id,
      input: {
        customCodes,
      },
    })
  }

  return (
    <Card>
      <Card.Content>
        <Form
          onSubmit={onSubmit}
          defaultValues={{
            customCodeBody: app.customCodes?.body || '',
          }}
        >
          <div className="space-y-6">
            <FormCodeEditor
              label={
                <>
                  Custom code for <code>{`<body>`}</code>
                </>
              }
              name="customCodeBody"
              value={app.customCodes?.body}
            />
            <Form.Actions>
              <Button variant="primary" type="submit" loading={isUpdating}>
                Update
              </Button>
            </Form.Actions>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}
