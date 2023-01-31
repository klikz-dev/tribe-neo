import gql from 'graphql-tag'

import { EventTypeFields, eventTypeGQLFields } from './eventType.fields'

export const globalEventTypesQuery = (fields: EventTypeFields) => gql`
  query globalEventTypes {
    globalEventTypes {
      ${eventTypeGQLFields(fields)}
    }
  }
`
