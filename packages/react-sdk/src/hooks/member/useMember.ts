import { UseQueryOptions } from 'react-query'

import { MemberFields, Types } from '@tribeplatform/gql-client'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberKey } from '../../utils/keys'
import { useCachedMember } from '../cache'

export const useMember = (options: {
  id: Types.Scalars['ID']
  fields?: MemberFields
  useQueryOptions?: UseQueryOptions<Types.Member>
}) => {
  const { id, fields = 'default', useQueryOptions } = options
  const { client } = useTribeClient()
  const memberKey = getMemberKey({ id })
  const memberPlaceHolder = useCachedMember(id)

  return useQuery<Types.Member>(
    memberKey,
    () => client.members.get(id, fields),
    {
      placeholderData: () => memberPlaceHolder,
      ...useQueryOptions,
    },
  )
}
