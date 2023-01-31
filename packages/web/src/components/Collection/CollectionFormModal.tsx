import { useHistory } from 'react-router-dom'

import { Types } from '@tribeplatform/gql-client/'
import { Form } from '@tribeplatform/react-sdk/components'
import {
  useCreateCollection,
  useUpdateCollection,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

export const CollectionFormModal = ({
  collection,
  open,
  onClose,
}: {
  collection?: Types.Collection
  open: boolean
  onClose: () => void
}) => {
  const { mutateAsync: createCollection, isLoading: isCreating } =
    useCreateCollection({
      fields: 'basic',
    })
  const { mutateAsync: updateCollection, isLoading: isUpdating } =
    useUpdateCollection()
  const history = useHistory()

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title="Create a new collection" />
      <Modal.Content>
        <Form
          defaultValues={collection}
          onSubmit={async data => {
            const { name, description } = data
            const input = {
              name,
              description,
            }

            if (collection?.id)
              return updateCollection({
                id: collection.id,
                input,
              }).then(() => {
                onClose()
              })

            return createCollection({
              input,
            }).then(collection => {
              onClose()
              history.push(`/collection/${collection.id}`)
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
            <Form.Actions>
              <Button
                variant="primary"
                type="submit"
                loading={isCreating || isUpdating}
              >
                {collection?.id ? 'Update' : 'Create'}
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
