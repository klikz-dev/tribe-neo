import { useHistory } from 'react-router-dom'

import { Collection } from '@tribeplatform/gql-client/types'
import { useDeleteCollection } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { Text } from '@tribeplatform/react-ui-kit/Text'

export const CollectionDeleteModal = ({
  collection,
  open,
  onClose,
}: {
  collection?: Collection
  open: boolean
  onClose: () => void
}) => {
  const { mutateAsync: deleteCollection, isLoading } = useDeleteCollection({
    fields: 'basic',
  })
  const hasSpaces = !!collection?.spaces?.nodes?.length
  const history = useHistory()

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title={`Delete ${collection?.name} collection`} />
      <Modal.Content>
        {hasSpaces ? (
          <Text>
            To delete this collection, you have to first remove the spaces
            within it. Go to each space&apos;s settings to either delete the
            spaces or move them to a different collection.
          </Text>
        ) : (
          <Text>
            Are you sure you want to delete {collection?.name} collection?
          </Text>
        )}
      </Modal.Content>
      {hasSpaces ? (
        <Modal.Actions>
          <Button variant="secondary" onClick={onClose}>
            Got It
          </Button>
        </Modal.Actions>
      ) : (
        <Modal.Actions>
          <Button
            loading={isLoading}
            onClick={() => {
              deleteCollection({ id: collection?.id }).then(() => {
                onClose()
                history.push('/')
              })
            }}
          >
            Confirm
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  )
}
