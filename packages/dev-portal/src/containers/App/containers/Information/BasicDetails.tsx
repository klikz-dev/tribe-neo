import { App, Image } from '@tribeplatform/gql-client/types'
import { Form } from '@tribeplatform/react-sdk/components'
import { useGlobalUpdateApp } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { AvatarInput } from '../../../../components/AvatarInput'

type BasicDetailsProps = {
  app: App
}

export const BasicDetails = ({ app }: BasicDetailsProps) => {
  const { mutate: updateApp, isLoading: isUpdating } = useGlobalUpdateApp({
    fields: {
      image: 'basic',
    },
  })
  const isUploading = false

  const onSubmit = data => {
    updateApp({
      id: app?.id,
      input: {
        name: data.name,
        description: data.description,
        imageId: data.imageId,
      },
    })
  }

  return (
    <Card>
      <Card.Header
        title="Basic details"
        description="This information will be shown in Tribe’s App Directory and in the App’s page"
        withBorder
      />
      <Card.Content>
        <Form
          onSubmit={onSubmit}
          defaultValues={{
            name: app?.name,
            description: app?.description,
            imageId: (app?.globalImage as Image)?.id,
          }}
        >
          <div className="space-y-6">
            <AvatarInput
              label="App logo"
              name="imageId"
              alt={app?.name || ' '}
              picture={app?.globalImage as Image}
              helperText="1:1 ratio, 512px x 512px recommended"
            />

            <Form.Input
              label="App name"
              name="name"
              validation={{
                required: "This field can't be empty",
              }}
            />

            <Form.Textarea
              label="Short description"
              name="description"
              placeholder="Enter the short description here"
              validation={{
                required: "This field can't be empty",
                maxLength: {
                  value: 200,
                  message: 'Must not be longer than 200 characters long',
                },
              }}
              helperText="Maximum 200 characters"
            />
            <Form.Actions>
              <Button
                variant="primary"
                type="submit"
                loading={isUploading || isUpdating}
              >
                Update
              </Button>
            </Form.Actions>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}
