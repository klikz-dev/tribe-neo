import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'

import { EventType } from '@tribeplatform/gql-client/types'
import { useGlobalEventTypes } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Table } from '@tribeplatform/react-ui-kit/Table'

type EventsListTableProps = {
  events: string[]
  onDeleteEvent: (deletedEvent: string) => void
}

export const WebhookEventTableRow = (props: {
  event: EventType
  onClick: () => void
}) => {
  const { event } = props

  if (!event) {
    return null
  }

  return (
    <Table.Row>
      <Table.Cell>{event.name}</Table.Cell>
      <Table.Cell nowrap={false} variant="text-secondary">
        {event.description}
      </Table.Cell>
      <Table.Cell variant="text-secondary">{event.requiredScope}</Table.Cell>
      <Table.Cell>
        <Button
          trailingIcon={<DeleteBinLineIcon />}
          variant="danger"
          onClick={props.onClick}
        />
      </Table.Cell>
    </Table.Row>
  )
}

export const WebhookEventsTable = ({
  events,
  onDeleteEvent,
}: EventsListTableProps) => {
  const { data: eventTypes } = useGlobalEventTypes({
    variables: {},
  })

  return (
    <Table className="table-fixed">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className="w-1/5">Event name</Table.HeaderCell>
          <Table.HeaderCell className="w-3/5">Description</Table.HeaderCell>
          <Table.HeaderCell>Scope</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {events.map(name => (
          <WebhookEventTableRow
            key={name}
            event={eventTypes?.find(it => it.name === name)}
            onClick={() => onDeleteEvent(name)}
          />
        ))}
      </Table.Body>
    </Table>
  )
}
