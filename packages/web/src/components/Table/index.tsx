import CheckIcon from '@heroicons/react/outline/CheckIcon'
import XIcon from '@heroicons/react/solid/XIcon'
import InfiniteScroll from 'react-infinite-scroller'
import { Link as ReactLink } from 'react-router-dom'
import { useTable, useColumnOrder } from 'react-table'

import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Table as TableComponent } from '@tribeplatform/react-ui-kit/Table'

import { SpaceImage } from '../Space/SpaceImage'
import { FieldsPicker } from './FieldsPicker'

export const Table = ({
  columns,
  data,
  fetchNextPage,
  hasNextPage = false,
  isLoading = false,
  isFetchingNextPage = false,
  fieldsFooter = null,
  ...props
}) => {
  const memoData = React.useMemo(() => data, [data]) || []
  const memoColumns = React.useMemo(() => columns, [columns]) || []
  const { nodes: items } = simplifyPaginatedResult(memoData)

  const CellRenderer = ({ value, row: { values }, column: { type } }) => {
    switch (type) {
      case 'memberPrimary':
        return (
          <Link
            className="hover:underline"
            as={ReactLink}
            to={`/member/${values?.id}`}
          >
            {value}
          </Link>
        )
      case 'spacePrimary':
        return (
          <Link
            className="hover:underline"
            as={ReactLink}
            to={`/${values?.slug}`}
          >
            {value}
          </Link>
        )
      case 'avatar':
      case 'image':
        return <Avatar size="sm" name={values?.name} src={value} />

      case 'spaceImage':
        return <SpaceImage size="sm" space={values} />

      case 'number':
        return value?.toLocaleString ? value.toLocaleString() : 0

      case 'postField':
        return value ? (
          <Link
            as={ReactLink}
            to={`/${values?.space?.slug}/post/${
              values?.slug ? `${values?.slug}-${values?.id}` : value?.id
            }`}
          >
            {JSON.parse(value)}
          </Link>
        ) : (
          ''
        )

      case 'member':
        return (
          <Badge
            variant="secondary"
            as={ReactLink}
            to={`/member/${value.id}`}
            rounded
            leadingIcon={<Avatar size="xs" src={value?.profilePicture?.url} />}
          >
            {value?.name}
          </Badge>
        )

      case 'boolean':
        return value === true ? (
          <CheckIcon className="w-4 h-4 text-success-700" />
        ) : (
          <XIcon className="w-4 h-4 text-danger-500" />
        )

      case 'longtext':
        return (
          <div className="max-w-sm max-h-5 overflow-hidden truncate">
            {value}
          </div>
        )
      case 'space':
        return (
          <Link as={ReactLink} to={`/${value.slug}`}>
            <div>{value?.name}</div>
          </Link>
        )

      case 'date':
        return value ? (
          <div title={new Date(value).toLocaleString()}>
            {new Date(value).toLocaleDateString()}
          </div>
        ) : (
          ''
        )
      case 'email':
        return (
          <a href={`mailto:${value}`} target="_blank">
            {value}
          </a>
        )
      default:
        return value
    }
  }

  const tableConfig = {
    defaultColumn: {},
    initialState: {
      hiddenColumns: memoColumns.map(column => {
        if (column.visible !== true) return column.accessor
        return null
      }),
    },
    columns: memoColumns,
    data: items,
  }

  if (CellRenderer) {
    tableConfig.defaultColumn.Cell = CellRenderer
  }

  const table = useTable(tableConfig, useColumnOrder)
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table

  const loader = (
    <>
      {[...Array(10)].map((_e, i) => {
        return headerGroups.map(headerGroup => (
          // eslint-disable-next-line
          <TableComponent.Row key={i}>
            {headerGroup.headers.map((_e, j) => (
              // eslint-disable-next-line
              <TableComponent.Cell key={j} className="animate-pulse">
                <div className="h-4 bg-surface-300 rounded-full w-3/4" />
              </TableComponent.Cell>
            ))}
          </TableComponent.Row>
        ))
      })}
    </>
  )

  return (
    <div className="flex flex-col space-y-5 overflow-hidden">
      <Card>
        <Card.Content className="flex">
          <div className="flex-grow"></div>
          <div>
            <FieldsPicker table={table} footer={fieldsFooter} />
          </div>
        </Card.Content>
      </Card>
      <Card className="overflow-hidden">
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchNextPage}
          hasMore={(hasNextPage && !isFetchingNextPage) || false}
          threshold={300}
          useWindow={false}
        >
          <TableComponent {...props} {...getTableProps()}>
            <TableComponent.Header>
              {headerGroups.map(headerGroup => (
                // eslint-disable-next-line react/jsx-key
                <TableComponent.Row {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    // eslint-disable-next-line react/jsx-key
                    <TableComponent.HeaderCell {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </TableComponent.HeaderCell>
                  ))}
                </TableComponent.Row>
              ))}
            </TableComponent.Header>
            <TableComponent.Body {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  // eslint-disable-next-line react/jsx-key
                  <TableComponent.Row {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <TableComponent.Cell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableComponent.Cell>
                      )
                    })}
                  </TableComponent.Row>
                )
              })}
              {isLoading || isFetchingNextPage ? loader : null}
            </TableComponent.Body>
          </TableComponent>
        </InfiniteScroll>
      </Card>
    </div>
  )
}
