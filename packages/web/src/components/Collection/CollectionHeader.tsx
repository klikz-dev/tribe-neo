import { useCallback, useState } from 'react'

import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import ViewListIcon from '@heroicons/react/outline/ViewListIcon'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Collection } from '@tribeplatform/gql-client/types'
import { useNetwork } from '@tribeplatform/react-sdk/hooks'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'
import { PageHeader } from '@tribeplatform/react-ui-kit/PageHeader'

import { Button } from '../Button'
import { CreateSpaceModal } from '../Space/CreateSpaceModal'
import { CollectionDeleteModal } from './CollectionDeleteModal'
import { CollectionFormModal } from './CollectionFormModal'
import { CollectionOrganizationModal } from './CollectionOrganizationModal'

export const CollectionHeaderActionButtons = ({
  collection,
}: {
  collection?: Collection
}) => {
  const [openOrganizationModal, setOpenOrganizationModal] = useState(false)
  const [openSpaceModal, setOpenSpaceModal] = useState(false)
  const [openCollectionModal, setOpenCollectionModal] = useState(false)
  const [openDeleteCollectionModal, setOpenDeleteCollectionModal] =
    useState(false)
  const { data: network = {} } = useNetwork()

  const [canCreateSpace, canCreateCollection] = hasScopesPermission(network, [
    'addSpace',
    'createCollection',
  ])

  const onOrganizationModalClose = useCallback(() => {
    setOpenOrganizationModal(false)
  }, [])

  const onOrganizeClick = useCallback(() => {
    setOpenOrganizationModal(true)
  }, [])

  const onDeleteClick = useCallback(() => {
    setOpenDeleteCollectionModal(true)
  }, [])

  const closeCollectionModal = useCallback(() => {
    setOpenCollectionModal(false)
  }, [])

  const deleteCollectionModal = useCallback(() => {
    setOpenDeleteCollectionModal(false)
  }, [])

  const closeCreateSpaceModal = useCallback(() => {
    setOpenSpaceModal(false)
  }, [])

  const openCreateSpaceModal = useCallback(() => {
    setOpenSpaceModal(true)
  }, [])

  const openEditCollectionModal = useCallback(() => {
    setOpenCollectionModal(true)
  }, [])

  return (
    <>
      {/* Actions Dropdown */}
      {canCreateCollection && (
        <Dropdown placement="bottom-end">
          <Dropdown.ButtonMinimal>
            <Button leadingIcon="DotsHorizontalIcon" variant="outline" />
          </Dropdown.ButtonMinimal>
          <Dropdown.Items className="-mt-2">
            <Dropdown.Item
              leadingIcon={<PencilAltIcon />}
              onClick={openEditCollectionModal}
            >
              Edit Collection
            </Dropdown.Item>
            <Dropdown.Item
              leadingIcon={<ViewListIcon />}
              onClick={onOrganizeClick}
            >
              Organize
            </Dropdown.Item>
            <Dropdown.Item leadingIcon={<TrashIcon />} onClick={onDeleteClick}>
              Delete Collection
            </Dropdown.Item>
          </Dropdown.Items>
        </Dropdown>
      )}
      {openCollectionModal && (
        <CollectionFormModal
          open={openCollectionModal}
          collection={collection}
          onClose={closeCollectionModal}
        />
      )}
      {openDeleteCollectionModal && (
        <CollectionDeleteModal
          open={openDeleteCollectionModal}
          onClose={deleteCollectionModal}
          collection={collection}
        />
      )}

      {/* Create Space Button */}
      {canCreateSpace && (
        <Button leadingIcon="PlusIcon" onClick={openCreateSpaceModal}>
          Add space
        </Button>
      )}
      {openSpaceModal ? (
        <CreateSpaceModal
          open={openSpaceModal}
          space={{
            collectionId: collection?.id,
          }}
          onClose={closeCreateSpaceModal}
        />
      ) : null}
      {openOrganizationModal && (
        <CollectionOrganizationModal
          open={openOrganizationModal}
          onClose={onOrganizationModalClose}
          collection={collection}
        />
      )}
    </>
  )
}

export const CollectionHeader = ({
  collection,
}: {
  collection?: Collection
}) => {
  return (
    <div className="px-3 sm:px-0 py-3">
      <PageHeader
        title={collection?.name}
        description={collection?.description}
        action={<CollectionHeaderActionButtons collection={collection} />}
      />
    </div>
  )
}
