import {
  DomainTransferStatus,
  QueryNewDomainStatusArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getNewDomainStatusKey } from '../../utils/keys'

export const useNewDomainStatus = (options?: {
  variables: QueryNewDomainStatusArgs
  useQueryOptions?: UseQueryOptions<DomainTransferStatus>
}) => {
  const { useQueryOptions, variables } = options || {}
  const { client } = useTribeClient()
  const newDomainStatusKey = getNewDomainStatusKey()

  return useQuery<DomainTransferStatus>(
    newDomainStatusKey,
    () => client.network.newDomainStatus(variables),
    useQueryOptions,
  )
}
