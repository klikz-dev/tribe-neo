import { useCallback, useState } from 'react'

import { Collection } from '@tribeplatform/gql-client/types'
import { useOrganizeSpacesInCollection } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { Text } from '@tribeplatform/react-ui-kit/Text'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { DraggableList } from '../DraggableList'
import { SpaceImage } from '../Space/SpaceImage'

export const CollectionOrganizationModal = ({
  collection,
  open,
  onClose,
}: {
  collection?: Collection
  open: boolean
  onClose: () => void
}) => {
  const { mutateAsync: organizeSpaces, isLoading } =
    useOrganizeSpacesInCollection()
  const [sortedSpaces, setSortedSpaces] = useState(
    collection?.spaces?.edges || [],
  )

  const hasSpaces = !!sortedSpaces?.length

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) {
        return
      }

      const newSortedSpaces = DraggableList.reorder(
        sortedSpaces,
        result.source.index,
        result.destination.index,
      )

      setSortedSpaces(newSortedSpaces)
    },
    [sortedSpaces],
  )

  const onSave = useCallback(async () => {
    const spaceIds = sortedSpaces.map(({ node: { id } }) => id)
    const collectionId = collection.id

    try {
      await organizeSpaces({ collectionId, spaceIds })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error.message,
        status: 'error',
      })
      return
    }

    onClose()
  }, [collection.id, onClose, organizeSpaces, sortedSpaces])

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header
        title="Organize space in the collection"
        description="Customize order by draging and dropping spaces"
      />
      <Modal.Content
        className="overflow-y-auto my-4"
        style={{ maxHeight: '75vh', paddingTop: 0, paddingBottom: 0 }}
      >
        {hasSpaces ? (
          <div className="flex flex-col space-y-2">
            <DraggableList id="collection-space-items" onDragEnd={onDragEnd}>
              {sortedSpaces.map(({ node: space }, index) => (
                <DraggableList.Item
                  isInsideModal
                  key={space.id}
                  id={space.id}
                  index={index}
                >
                  <SpaceImage space={space} size="sm" />
                  <div className="ml-2 truncate">{space.name}</div>
                </DraggableList.Item>
              ))}
            </DraggableList>
          </div>
        ) : (
          <Text>No spaces in the collection</Text>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button loading={isLoading} onClick={onSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
