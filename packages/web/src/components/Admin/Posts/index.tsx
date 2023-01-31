import { useFeed } from '@tribeplatform/react-sdk/hooks'

import { Table } from '../../Table'

export const Posts = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFeed({
      variables: { limit: 15 },
      useInfiniteQueryOptions: { keepPreviousData: true },
    })

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      type: 'primary',
      visible: false,
    },
    {
      Header: 'Title',
      accessor: 'mappingFields[0].value',
      type: 'postField',
      visible: true,
    },
    {
      Header: 'Author',
      accessor: 'owner.member',
      type: 'member',
      visible: true,
    },
    {
      Header: 'Space',
      accessor: 'space',
      type: 'space',
      visible: true,
    },
    {
      Header: 'Post Type',
      accessor: 'postType.name',
      visible: true,
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      type: 'date',
      visible: true,
    },
    {
      Header: 'Replies',
      accessor: 'totalRepliesCount',
      type: 'number',
      visible: true,
    },
    {
      Header: 'Content',
      accessor: 'shortContent',
      type: 'html',
      visible: false,
    },
    {
      Header: 'Slug',
      accessor: 'slug',
      type: 'primary',
      visible: false,
    },
  ]

  return (
    <Table
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      columns={columns}
      data={data}
    />
  )
}
