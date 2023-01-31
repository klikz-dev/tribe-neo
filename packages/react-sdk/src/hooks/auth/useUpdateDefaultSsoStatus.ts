import {
  MutationUpdateDefaultSsoStatusArgs,
  Action,
  Sso,
  DefaultSsoType,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSsosKey } from '../../utils/keys'

export const useUpdateDefaultSsoStatus = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    Error,
    MutationUpdateDefaultSsoStatusArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const ssosKey = getSsosKey()

  return useMutation<Action, Error, MutationUpdateDefaultSsoStatusArgs>(
    input => client.auth.updateDefaultSsoStatus(input),
    {
      onMutate: variables => {
        queryClient.setQueriesData<Sso[]>(ssosKey, old =>
          old.map(sso => ({
            ...sso,
            status:
              (sso.type as unknown as DefaultSsoType) === variables.sso
                ? variables.status
                : sso.status,
          })),
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries(ssosKey)
      },
      ...useMutationOptions,
    },
  )
}
