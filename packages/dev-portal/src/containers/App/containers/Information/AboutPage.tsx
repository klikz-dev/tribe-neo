import { App } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useGlobalUpdateApp } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { FormHtmlEditor } from '../../../../components/HtmlEditor/FormHtmlEditor'

type AboutPageProps = {
  app: App
}

export const AboutPage = ({ app }: AboutPageProps) => {
  const { mutate: updateApp, isLoading: isUpdating } = useGlobalUpdateApp()

  const onSubmit = data => {
    updateApp({
      id: app.id,
      input: {
        about: data.about,
      },
    })
  }

  return (
    <Card>
      <Card.Header
        title="About page"
        description="This information will be shown in the App’s page"
        withBorder
      />
      <Card.Content>
        <Form
          onSubmit={onSubmit}
          defaultValues={{
            about: app.about || '',
          }}
        >
          <div className="space-y-6">
            <FormHtmlEditor
              label="Long description"
              name="about"
              placeholder="Enter the description here"
              value={app.about}
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
