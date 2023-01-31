import { useCollections } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { GridList } from '@tribeplatform/react-ui-kit/Layout'

import { CollectionCard } from './CollectionCard'

export const CollectionListLoading = ({ count = 16 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <GridList.Item key={i}>
          <Card className="h-full">
            <div className="animate-pulse flex-1 flex flex-col mb-2 p-6 pt-4 space-y-3 items-center text-center">
              <div className="mb-3 w-24 h-24 rounded-full bg-surface-300" />
              <div className="h-4 bg-surface-300 rounded-full w-2/3" />
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
            </div>
          </Card>
        </GridList.Item>
      ))}
    </>
  )
}

export const CommunityCollectionList = () => {
  const { data: collections, isFetching } = useCollections({
    fields: 'basic',
  })
  return (
    <GridList columns={4}>
      {collections?.map(collection => (
        <GridList.Item key={collection.id}>
          <CollectionCard collection={collection} />
        </GridList.Item>
      ))}
      {isFetching ? <CollectionListLoading /> : null}
    </GridList>
  )
}
