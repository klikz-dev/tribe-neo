import PhotographIcon from '@heroicons/react/outline/PhotographIcon'

import { useSpaces } from '@tribeplatform/react-sdk/hooks'

import { Table } from '../../Table'

export const Spaces = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSpaces({
      fields: {
        image: 'basic',
      },
      variables: { limit: 15 },
      useInfiniteQueryOptions: { keepPreviousData: true },
    })

  const columns = [
    {
      accessor: 'image',
      type: 'spaceImage',
      Header: (
        <div className="w-8">
          <PhotographIcon className="w-5 h-5 m-auto" />
        </div>
      ),
      visible: true,
    },
    {
      Header: 'ID',
      accessor: 'id',
      type: 'spacePrimary',
      visible: false,
    },
    {
      Header: 'Name',
      accessor: 'name',
      type: 'spacePrimary',
      visible: true,
    },
    {
      Header: 'Members Count',
      accessor: 'membersCount',
      type: 'number',
      visible: true,
    },
    {
      Header: 'Posts Count',
      accessor: 'postsCount',
      type: 'number',
      visible: true,
    },
    {
      Header: 'Slug',
      accessor: 'slug',
      type: 'spacePrimary',
      visible: false,
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      type: 'date',
      visible: true,
    },
    {
      Header: 'Private',
      accessor: 'private',
      type: 'boolean',
      visible: true,
    },
    {
      Header: 'Invite Only',
      accessor: 'inviteOnly',
      type: 'boolean',
      visible: false,
    },
    {
      Header: 'Hidden',
      accessor: 'hidden',
      type: 'boolean',
      visible: false,
    },
    {
      Header: 'Description',
      accessor: 'description',
      type: 'longtext',
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
