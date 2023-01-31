import { Context } from 'vm'

import { ClientError } from '@tribeplatform/gql-client/@types'
import {
  MutationUpdateJwtSsoArgs,
  Sso,
  SsoType,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSsosKey } from '../../utils/keys'

export const useUpdateJwtSso = (options?: {
  useMutationOptions?: UseMutationOptions<
    Sso,
    ClientError,
    MutationUpdateJwtSsoArgs,
    { snapshot: Sso }
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const ssosKey = getSsosKey()

  return useMutation<Sso, Error, MutationUpdateJwtSsoArgs>(
    (input: MutationUpdateJwtSsoArgs) => client.auth.updateJwtSso(input),
    {
      onMutate: async updatedJwtSso => {
        await queryClient.cancelQueries(ssosKey)
        const snapshot = queryClient.getQueryData<Sso[]>(ssosKey)

        queryClient.setQueriesData<Sso[]>(ssosKey, old => [
          ...old?.filter(sso => sso.type !== SsoType.JWT),
          { ...old?.find(sso => sso.type === SsoType.JWT), ...updatedJwtSso },
        ])

        return { snapshot }
      },
      onSuccess: updatedJwtSso => {
        queryClient.setQueryData<Sso[]>(ssosKey, old => [
          ...old?.filter(sso => sso.type !== SsoType.JWT),
          { ...old?.find(sso => sso.type === SsoType.JWT), ...updatedJwtSso },
        ])
      },
      onError: (_, __, context: Context) => {
        queryClient.setQueryData<Sso[]>(ssosKey, context.snapshot)
        queryClient.invalidateQueries(ssosKey)
      },
      onSettled: () => {
        queryClient.invalidateQueries(ssosKey)
      },
      ...useMutationOptions,
    },
  )
}
