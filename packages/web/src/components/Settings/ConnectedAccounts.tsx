import {
  SsoMembership,
  SsoStatus,
  SsoType,
} from '@tribeplatform/gql-client/types'
import {
  useLoginWithSso,
  useNetwork,
  useSsoMemberships,
  useSsos,
  useDeleteSsoMembership,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { getSsoCallbackUrl } from '../../utils/sso'
import { SsoIcon } from '../Auth/SsoIcons'

const isMember = (ssoType: SsoType, memberships: SsoMembership[]) => {
  return memberships?.find(membership => membership.ssoType === ssoType)
}

export const ConnectedAccounts = ({ member }: { member: { id: string } }) => {
  const { data: network } = useNetwork()
  const { data: ssos } = useSsos({
    variables: { status: SsoStatus.ENABLE },
  })
  const { login } = useLoginWithSso()
  const { mutate: deleteMembership } = useDeleteSsoMembership()
  const { data: memberships, refetch: refetchMemberships } = useSsoMemberships({
    variables: {
      memberId: member.id,
    },
  })
  const defaultSsos = ssos?.filter(sso => sso.type !== SsoType.OAUTH2)

  const toggleSso = async (type: SsoType) => {
    const isConnected = isMember(type, memberships)

    if (isConnected) {
      deleteMembership(
        {
          memberId: member.id,
          type,
        },
        {
          onSuccess: () => {
            toast({
              title: 'Successfully disconnected the account.',
              status: 'success',
            })
          },
          onError: () => {
            toast({
              title: 'Unable to disconnect the account.',
              status: 'error',
            })
          },
          onSettled: () => {
            refetchMemberships()
          },
        },
      )
    } else {
      const callbackUrl = getSsoCallbackUrl(
        type,
        network.domain,
        '/settings/login',
      )

      const response = await login({
        input: {
          type,
          callbackUrl,
        },
      })

      window.location.href = response.url
    }
  }

  if (!defaultSsos || !defaultSsos.length) return null

  return (
    <Card>
      <Card.Header title="Connected Accounts" />
      <Card.Content>
        <div className="space-x-3 flex">
          {defaultSsos.map(({ type, name, buttonText }) => (
            <Button
              href="#"
              onClick={() => toggleSso(type)}
              className="justify-center"
              key={type}
              variant="outline"
              size="lg"
              leadingIcon={
                SsoIcon[type] && <span className="mr-2">{SsoIcon[type]}</span>
              }
            >
              {isMember(type, memberships)
                ? 'Disconnect'
                : `Connect with ${buttonText || name}`}
            </Button>
          ))}
        </div>
      </Card.Content>
    </Card>
  )
}
