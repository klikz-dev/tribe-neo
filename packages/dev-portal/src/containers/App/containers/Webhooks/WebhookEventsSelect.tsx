import clsx from 'clsx'
import { Controller } from 'react-hook-form'

import { useGlobalEventTypes } from '@tribeplatform/react-sdk/hooks'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Select } from '@tribeplatform/react-ui-kit/Select'

import { WebhookEventsTable } from './WebhookEventsTable'

export const WebhookEventsSelect = ({
  control,
  register: _,
  name,
  ...rest
}: any) => {
  const { data: eventTypes, isLoading } = useGlobalEventTypes({
    variables: {},
  })

  if (isLoading) {
    return null
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onDeleteEvent = (deletedEvent: string) => {
          const filteredEvents = value.filter(it => it !== deletedEvent)
          onChange(filteredEvents)
        }
        return (
          <>
            <FormControl.Select
              invalid={!!error?.message}
              error={error?.message}
              value={value}
              onChange={newValue => {
                onChange([...value, newValue])
              }}
              {...rest}
            >
              <Select.Button>Select an event...</Select.Button>
              <Select.Items>
                {eventTypes
                  ?.filter(it => !value.includes(it.name))
                  .map(event => {
                    if (
                      [
                        'sso.created',
                        'sso.updated',
                        'sso.deleted',
                        'organization.created',
                        'network.created',
                        'role.created',
                        'space_network_role.created',
                        'space_network_role.updated',
                        'space_role.created',
                        'space_role.updated',
                        'subscription.created',
                        'subscription.canceled',
                        'subscription.updated',
                        'app.created',
                        'app.updated',
                        'app.deleted',
                        'tracker.viewed',
                        'tracker.pinged',
                        'custom.created',
                      ].indexOf(event.name) !== -1
                    )
                      return null

                    return (
                      <Select.Item value={event.name} key={event.name}>
                        {({ selected, active }) => (
                          <div className="flex">
                            <span
                              className={clsx(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-2 block truncate',
                              )}
                            >
                              {event.name}
                            </span>
                            <span
                              className={clsx(
                                active
                                  ? 'text-actionPrimary-200'
                                  : 'text-basicSurface-500',
                                'ml-3 truncate',
                              )}
                            >
                              {event.shortDescription}
                            </span>
                          </div>
                        )}
                      </Select.Item>
                    )
                  })}
              </Select.Items>
            </FormControl.Select>
            {value.length === 0 && (
              <Alert status="info">No community events have been added</Alert>
            )}
            {value.length > 0 && (
              <WebhookEventsTable
                events={value}
                onDeleteEvent={onDeleteEvent}
              />
            )}
          </>
        )
      }}
    />
  )
}
