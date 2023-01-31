export type CollectionMenuItem = {
  id: string
  enabled: boolean
}

export type CollectionMenuDetailedItem = CollectionMenuItem & {
  name: string
}
