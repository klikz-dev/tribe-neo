import { useCallback, useState } from 'react'

import { Disclosure } from '@headlessui/react'
import DotsHorizontalIcon from '@heroicons/react/outline/DotsHorizontalIcon'
import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import ChevronDownIcon from '@heroicons/react/solid/ChevronDownIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'
import ViewGridSolidIcon from '@heroicons/react/solid/ViewGridIcon'
import ViewListIcon from '@heroicons/react/solid/ViewListIcon'
import clsx from 'clsx'
import { matchPath, useLocation } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Collection } from '@tribeplatform/gql-client/types'
import { useCollections, useNetwork } from '@tribeplatform/react-sdk/hooks'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'
import { NavVertical } from '@tribeplatform/react-ui-kit/Sidebar'

import { getUserSettings, setUserSetting } from '../../lib/userSettings'
import { useMobileSidebar } from '../../MobileSidebarProvider'
import { CollectionDeleteModal } from '../Collection/CollectionDeleteModal'
import { CollectionFormModal } from '../Collection/CollectionFormModal'
import { CollectionOrganizationModal } from '../Collection/CollectionOrganizationModal'
import { CreateSpaceModal } from '../Space/CreateSpaceModal'
import { SpaceImage } from '../Space/SpaceImage'
import { CollectionsLoading } from './CollectionLoading'
import { CollectionMenuItem } from './constants'
import { CollectionMenuSettings } from './settings/CollectionMenuSettings'
import { getOrderedCollections } from './utils'

export type CollectionMenuProps = {
  items?: CollectionMenuItem[]
  viewStyle: 'simple' | 'collapsible'
}

export const CollectionMenu = ({
  items = [],
  viewStyle = 'collapsible',
}: CollectionMenuProps) => {
  const { setMobileSidebarOpen } = useMobileSidebar()
  const [openSpaceModal, setOpenSpaceModal] = useState(false)
  const [space, setSpace] = useState({})

  const [openCollectionModal, setOpenCollectionModal] = useState(false)
  const [openOrganizationModal, setOpenOrganizationModal] = useState(false)
  const [openDeleteCollectionModal, setOpenDeleteCollectionModal] =
    useState(false)
  const [collection, setCollection] = useState<Collection>(undefined)

  const { data: network = {} } = useNetwork()

  const { data: collections, isLoading } = useCollections({
    fields: {
      space: {
        image: 'basic',
        banner: 'basic',
        authMemberProps: 'all',
      },
    },
    variables: {},
  })

  const [canCreateSpace, canCreateCollection] = hasScopesPermission(network, [
    'addSpace',
    'createCollection',
  ])

  const location = useLocation()

  const onOrganizationModalClose = useCallback(() => {
    setOpenOrganizationModal(false)
  }, [])

  if (isLoading) return <CollectionsLoading />
  if (!Array.isArray(collections)) return null

  const orderedCollections = getOrderedCollections(items, collections)
  const userSettings = getUserSettings()
  return (
    <>
      <nav className="flex-1 space-y-2 isolate mb-5">
        {orderedCollections.map(collection => {
          const hasSpaces = collection?.spaces?.edges?.length
          const isActive = matchPath(location.pathname, {
            path: `/collection/${collection.id}`,
            exact: true,
            strict: false,
          })

          if (!hasSpaces && !canCreateSpace) return null
          const simpleViewIcon = isActive ? (
            <ViewGridSolidIcon />
          ) : (
            <ViewGridIcon />
          )

          return (
            <Disclosure
              key={collection.id}
              defaultOpen={
                userSettings?.spaceCollections?.[collection?.id]?.isExpanded ??
                true
              }
            >
              {({ open }) => (
                <NavVertical.Group>
                  <NavVertical.Item
                    // className="group"
                    active={!!isActive}
                    as={Link}
                    onClick={() => {
                      setMobileSidebarOpen(false)
                    }}
                    to={`/collection/${collection.id}`}
                    leadingIcon={
                      viewStyle === 'collapsible' ? null : simpleViewIcon
                    }
                  >
                    {viewStyle === 'collapsible' ? (
                      <Disclosure.Button
                        as={Link}
                        to="#"
                        className={clsx(
                          'items-center justify-center w-6 h-6 rounded-md mr-3 -ml-1',
                          isActive ? 'hover:bg-main-300' : 'hover:bg-main-200',
                        )}
                      >
                        <ChevronDownIcon
                          onClick={() => {
                            setUserSetting('spaceCollection', {
                              id: collection?.id,
                              isExpanded: !open,
                              name: collection?.name,
                            })
                          }}
                          className={clsx(
                            'w-6 h-6 transform transition-transform',
                            !open ? '-rotate-90' : '',
                          )}
                        />
                      </Disclosure.Button>
                    ) : null}
                    <span className="truncate flex-grow font-semibold">
                      {collection.name}
                    </span>
                    {false && canCreateCollection && (
                      <Dropdown placement="bottom-end">
                        <Dropdown.ButtonMinimal className="opacity-0 group-hover:opacity-100">
                          <Link
                            to="#"
                            className={clsx(
                              'rounded-md ml-1 w-6 h-6 flex items-center justify-center flex-shrink-0',
                              isActive
                                ? 'hover:bg-main-300'
                                : 'hover:bg-main-200',
                            )}
                          >
                            <DotsHorizontalIcon className="w-4 h-4 text-basicMain-500" />
                          </Link>
                        </Dropdown.ButtonMinimal>
                        <Dropdown.Items className="-mt-2">
                          <Dropdown.Item
                            leadingIcon={<PencilAltIcon />}
                            onClick={() => {
                              setCollection(collection)
                              setOpenCollectionModal(true)
                            }}
                          >
                            Edit Collection
                          </Dropdown.Item>
                          <Dropdown.Item
                            leadingIcon={<ViewListIcon />}
                            onClick={() => {
                              setCollection(collection)
                              setOpenOrganizationModal(true)
                              setMobileSidebarOpen(false)
                            }}
                          >
                            Organize
                          </Dropdown.Item>
                          <Dropdown.Item
                            leadingIcon={<TrashIcon />}
                            onClick={() => {
                              setCollection(collection)
                              setOpenDeleteCollectionModal(true)
                            }}
                          >
                            Delete Collection
                          </Dropdown.Item>
                        </Dropdown.Items>
                      </Dropdown>
                    )}
                    {false && canCreateSpace && (
                      <Link
                        to="#"
                        className={clsx(
                          'rounded-md flex ml-1 w-6 h-6 items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100',
                          isActive ? 'hover:bg-main-300' : 'hover:bg-main-200',
                        )}
                        onClick={() => {
                          setSpace({
                            collectionId: collection.id,
                          })
                          setOpenSpaceModal(true)
                        }}
                      >
                        <PlusIcon className="w-4 h-4 text-basicMain-500" />
                      </Link>
                    )}
                  </NavVertical.Item>
                  {viewStyle === 'collapsible' ? (
                    <Disclosure.Panel>
                      <NavVertical.Group>
                        {collection?.spaces?.edges?.map(({ node: space }) => {
                          const isSpaceActive = matchPath(location.pathname, {
                            path: `/${space.slug}`,
                            strict: false,
                          })
                          return (
                            <NavVertical.Item
                              as={NavLink}
                              key={space.id}
                              to={`/${space.slug}`}
                              active={!!isSpaceActive}
                              onClick={() => setMobileSidebarOpen(false)}
                            >
                              <div className="mr-3 -ml-1">
                                <SpaceImage space={space} size="sm" />
                              </div>
                              <div className="truncate">{space.name}</div>
                            </NavVertical.Item>
                          )
                        })}
                        {!hasSpaces ? (
                          <NavVertical.Item
                            as={Link}
                            onClick={() => {
                              setSpace({
                                collectionId: collection.id,
                              })
                              setOpenSpaceModal(true)
                            }}
                            to="#"
                          >
                            <div className="w-6 h-6 -ml-1 mr-3 flex justify-center items-center">
                              <PlusIcon className="w-5 h-5" />
                            </div>
                            <div className="truncate">Add space</div>
                          </NavVertical.Item>
                        ) : null}
                      </NavVertical.Group>
                    </Disclosure.Panel>
                  ) : null}
                </NavVertical.Group>
              )}
            </Disclosure>
          )
        })}
      </nav>
      {openSpaceModal ? (
        <CreateSpaceModal
          open={openSpaceModal}
          space={space}
          onClose={() => {
            setOpenSpaceModal(false)
          }}
        />
      ) : null}
      {openCollectionModal ? (
        <CollectionFormModal
          open={openCollectionModal}
          collection={collection}
          onClose={() => {
            setOpenCollectionModal(false)
          }}
        />
      ) : null}
      {openDeleteCollectionModal && (
        <CollectionDeleteModal
          open={openDeleteCollectionModal}
          onClose={() => {
            setOpenDeleteCollectionModal(false)
          }}
          collection={collection}
        />
      )}
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

CollectionMenu.displayName = 'Collection Menu'
CollectionMenu.Settings = CollectionMenuSettings
