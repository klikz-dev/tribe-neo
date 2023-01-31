import { UseQueryOptions } from 'react-query'

import { SpaceFields } from '@tribeplatform/gql-client'
import { QuerySpaceArgs, Space } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSpaceKey } from '../../utils/keys'
import { useCachedSpace } from '../cache'

export const useSpace = (options: {
  variables: QuerySpaceArgs
  fields?: SpaceFields
  useQueryOptions?: UseQueryOptions<Space>
}) => {
  const { variables, fields, useQueryOptions } = options
  const { client } = useTribeClient()
  const cachedSpace = useCachedSpace(variables)
  const spaceKey = getSpaceKey(variables)

  return useQuery<Space>(spaceKey, () => client.spaces.get(variables, fields), {
    placeholderData: () => cachedSpace,
    ...useQueryOptions,
  })
}
