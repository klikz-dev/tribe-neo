import { UseQueryOptions } from 'react-query'

import { EventTypeFields } from '@tribeplatform/gql-client'
import { EventType } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useGlobalEventTypes = (options: {
  variables: any
  fields?: EventTypeFields
  useQueryOptions?: UseQueryOptions<Array<EventType>>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options || {}
  const { client } = useTribeClient()

  return useQuery<Array<EventType>>(
    'eventTypes',
    () => client.dev.eventTypes(variables, fields),
    { ...useQueryOptions },
  )
}
