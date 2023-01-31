import { useHistory } from 'react-router-dom'

import { Form } from '@tribeplatform/react-sdk/components'
import {
  useCollections,
  useCreateEmojis,
  useCreateSpace,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

export const CreateSpaceModal = ({ space = {}, open, onClose }) => {
  const { data: collections } = useCollections({
    fields: {
      space: {
        image: 'basic',
      },
    },
    variables: {},
  })
  const { mutateAsync: createSpace, isLoading } = useCreateSpace({
    fields: 'basic',
  })
  const { mutateAsync: createEmojis } = useCreateEmojis()
  const history = useHistory()

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title="Create a new space" />
      <Modal.Content>
        <Form
          defaultValues={space}
          onSubmit={async data => {
            const { name, collectionId, description, private: _private } = data
            const defaultEmoji = await createEmojis([
              { text: 'speech_balloon' },
            ])

            return createSpace({
              input: {
                imageId: defaultEmoji[0].id || 'speech_balloon',
                name,
                description,
                private: _private,
                collectionId,
              },
            }).then(space => {
              onClose()
              history.push(`/${space.slug}`)
            })
          }}
        >
          <div className="flex flex-col space-y-5">
            <Form.Input
              label="Name"
              name="name"
              validation={{ required: 'Please enter a name' }}
            />
            <Form.Textarea label="Description" name="description" />
            <Form.Toggle
              helperText="Only members can see who's in the space and what they post."
              label="Make private"
              name="private"
            />
            <Form.Select
              label="Collection"
              name="collectionId"
              placeholder="Select a collection..."
              items={collections?.map(collection => {
                return { value: collection.id, text: collection.name }
              })}
            />
            <Form.Actions>
              <Button variant="primary" type="submit" loading={isLoading}>
                Create
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Form.Actions>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
