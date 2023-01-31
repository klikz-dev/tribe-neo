import { useEffect } from 'react'

import { useIntercom } from 'react-use-intercom'

import { RoleType } from '@tribeplatform/gql-client/types'
import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

export const useBootIntercom = ({ userHash }: { userHash?: string | null }) => {
  const { boot } = useIntercom()
  const { data: authToken } = useAuthToken()
  const { member, network } = authToken || {}

  useEffect(() => {
    if (!member || member?.role?.type !== RoleType.ADMIN) return

    if (!userHash) {
      return
    }
    boot({
      email: member.email || '',
      userId: member.id,
      name: member.name || '',
      userHash,
      hideDefaultLauncher: true,
      customAttributes: {
        'Product Version': 2,
        'Product UI': 'Neo',
      },
      companies: [
        {
          companyId: network?.id || '',
          name: network?.name,
          customAttributes: {
            'Community URL': network?.domain,
            'Portal ID': network?.id,
            'Product Version': 2,
            'Product UI': 'Neo',
          },
        },
      ],
    })
  }, [])
}
