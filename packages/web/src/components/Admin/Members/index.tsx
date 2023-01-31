import PhotographIcon from '@heroicons/react/outline/PhotographIcon'
import { Link } from 'react-router-dom'

import { useMembers } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { Table } from '../../Table'

export const Members = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useMembers({
      fields: { profilePicture: 'basic', banner: 'basic' },
      variables: { limit: 15 },
      useInfiniteQueryOptions: { keepPreviousData: true },
    })

  const columns = [
    {
      name: 'Profile Picture',
      Header: (
        <div className="w-8">
          <PhotographIcon className="w-5 h-5 m-auto" />
        </div>
      ),
      accessor: 'profilePicture.url',
      type: 'avatar',
      visible: true,
    },
    {
      Header: 'ID',
      accessor: 'id',
      type: 'memberPrimary',
      visible: false,
    },
    {
      Header: 'Name',
      accessor: 'name',
      type: 'memberPrimary',
      visible: true,
    },
    {
      Header: 'Username',
      accessor: 'username',
      type: 'memberPrimary',
      visible: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      type: 'email',
      visible: true,
    },
    {
      Header: 'Tagline',
      accessor: 'tagline',
      visible: true,
    },
    {
      Header: 'Email Status',
      accessor: 'status',
    },
    {
      Header: 'Locale',
      accessor: 'attributes.locale',
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
      fieldsFooter={
        <Button
          fullWidth
          variant="outline"
          as={Link}
          to="/admin/network/memberfields"
        >
          Manage fields
        </Button>
      }
    />
  )
}
