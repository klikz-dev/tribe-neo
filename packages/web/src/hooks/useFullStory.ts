import { useCallback, useEffect, useRef } from 'react'

import { AuthToken, Network, RoleType } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

import { RuntimeConfigs } from '../config'

interface InitFullStoryArgs {
  memberId: AuthToken['member']['id']
  orgId: string
  network: Network
}

export const useFullStory = (): void => {
  const isClient = typeof window !== 'undefined'
  const isFullStoryInitialized = useRef<boolean>(false)
  const orgId = RuntimeConfigs.FULLSTORY_ORGANIZATION_ID
  const { data: authToken } = useAuthToken()
  const network = authToken?.network
  const isDevMode = RuntimeConfigs.NODE_ENV === 'development'

  const initFullStory = useCallback(
    async ({ memberId, orgId, network }: InitFullStoryArgs) => {
      isFullStoryInitialized.current = true
      const FullStory = await import('@fullstory/browser')

      FullStory.init({
        debug: RuntimeConfigs.FULLSTORY_DEBUG_MODE,
        devMode: isDevMode,
        orgId,
      })

      FullStory.identify(memberId, {
        networkId: network?.id,
        networkName: network?.name,
        networkDomain: network?.domain,
        networkIndustry: network?.industry,
        isTrial: network?.subscriptionPlan?.trial,
        networkPlan: network?.subscriptionPlan?.name,
        productUi: 'Neo',
      })
    },
    [isDevMode],
  )

  useEffect(() => {
    if (
      !isFullStoryInitialized?.current &&
      authToken?.member.role?.type === RoleType.ADMIN &&
      authToken?.member?.id &&
      network &&
      isClient &&
      orgId &&
      !isDevMode
    ) {
      initFullStory({
        memberId: authToken?.member?.id,
        orgId,
        network,
      })
    }
  }, [authToken, initFullStory, isClient, isDevMode, network, orgId])
}
