import { Collection } from '@tribeplatform/gql-client/types'

import { CollectionMenuDetailedItem, CollectionMenuItem } from './constants'

export const getItemsByIds = (
  items: CollectionMenuItem[],
): Record<string, CollectionMenuItem & { index: number }> => {
  const itemsById: Record<string, CollectionMenuItem & { index: number }> = {}
  items.forEach((item, index) => {
    itemsById[item.id] = { ...item, index }
  })
  return itemsById
}

export const getOrderedCollections = (
  items: CollectionMenuItem[],
  collections: Collection[],
  filterEnabled = true,
) => {
  const itemsById = getItemsByIds(items)
  const orderedCollections = collections
    .filter(
      c => itemsById[c.id] && (!filterEnabled || itemsById[c.id]?.enabled),
    )
    .sort((c1, c2) => itemsById[c1.id].index - itemsById[c2.id].index)
  const newCollections = collections
    .filter(c => !itemsById[c.id])
    .sort((c1, c2) => c1.customOrderingIndex - c2.customOrderingIndex)
  return [...orderedCollections, ...newCollections]
}

export const getDetailedCollectionItems = (
  items: CollectionMenuItem[],
  collections: Collection[],
): CollectionMenuDetailedItem[] => {
  const itemsById = getItemsByIds(items)
  const orderedCollections = getOrderedCollections(items, collections, false)
  return orderedCollections.map(c => ({
    id: c.id,
    name: c.name,
    enabled:
      typeof itemsById[c.id]?.enabled === 'undefined'
        ? true
        : itemsById[c.id]?.enabled,
  }))
}
