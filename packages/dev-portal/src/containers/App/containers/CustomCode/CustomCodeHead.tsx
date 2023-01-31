import { App } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useGlobalUpdateApp } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { FormCodeEditor } from '../../../../components/CodeEditor/FormCodeEditor'

type CustomCodeHeadProps = {
  app: App
}

export const CustomCodeHead = ({ app }: CustomCodeHeadProps) => {
  const { mutate: updateApp, isLoading: isUpdating } = useGlobalUpdateApp()

  const onSubmit = data => {
    const customCodes = app?.customCodes || {}
    if (data.customCodeHead) {
      customCodes.head = data.customCodeHead
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
            customCodeHead: app.customCodes?.head || '',
          }}
        >
          <div className="space-y-6">
            <FormCodeEditor
              label={
                <>
                  Custom code for <code>{`<head>`}</code>
                </>
              }
              name="customCodeHead"
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
