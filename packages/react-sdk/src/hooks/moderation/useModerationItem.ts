import { UseQueryOptions } from 'react-query'

import { ModerationItemFields } from '@tribeplatform/gql-client'
import {
  ModerationItem,
  QueryModerationItemArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getModerationItemKey } from '../../utils/keys'

export const useModerationItem = (options: {
  variables: QueryModerationItemArgs
  fields?: ModerationItemFields
  useQueryOptions?: UseQueryOptions<ModerationItem>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options
  const { client } = useTribeClient()
  const moderationItemKey = getModerationItemKey(variables)

  return useQuery<ModerationItem>(
    moderationItemKey,
    () => client.moderation.getItem(variables, fields),
    useQueryOptions,
  )
}
