import { useEffect, useMemo, useState } from 'react'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { RoleType, Space } from '@tribeplatform/gql-client/types'
import { useTribeClient } from '@tribeplatform/react-sdk'
import {
  useAuthMember,
  useAuthToken,
  useSpaces,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { pickIfExists } from '../../lib/arrays.utils'
import { SocialShareButtons } from '../ShareModal/SocialShareButtons'
import { EmailVerificationBanner } from './EmailVerificationBanner'
import { ShareInviteMemberLink } from './ShareInviteMemberLink'
import { UserImportContext, UserImportContextProps } from './UserImportContext'
import { UserImportForm } from './UserImportForm'
import { UserImportFormProps } from './useUserImportForm'

export interface UserImportModalProps {
  open: boolean
  onClose: () => void
}

export const UserImportModal = ({ open, onClose }) => {
  const {
    data: { network },
  } = useAuthToken()
  const { isAdmin } = useAuthMember()

  const { data, isLoading } = useSpaces({
    fields: { image: 'basic' },
    variables: { limit: 30 },
  })
  const spaces = useMemo(
    () => simplifyPaginatedResult<Space>(data)?.nodes || [],
    [data],
  )

  const { client } = useTribeClient()

  const [invitationLink, setInvitationLink] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const memberInvitationLink = await client.invitations.getLink()
      setInvitationLink(memberInvitationLink.link)
    })()
  }, [client])

  const [defaultSpaces, setDefaultSpaces] = useState<Space[]>([])

  useEffect(() => {
    const firstSpace = spaces?.[0]
    if (network?.defaultSpaces && network.defaultSpaces.length > 0) {
      setDefaultSpaces(pickIfExists(network?.defaultSpaces, spaces, 'id'))
    } else if (firstSpace) {
      setDefaultSpaces([firstSpace])
    } else {
      setDefaultSpaces([])
    }
  }, [network, spaces])

  const [canInviteMembers] = hasScopesPermission(network, ['inviteMembers'])
  const context: UserImportContextProps = {
    defaultSpaces,
    spaces,
    loading: isLoading,
    hasInviteDefaultsPermission: canInviteMembers,
    defaultRole:
      network?.roles?.find(it => it.type === RoleType.MEMBER) ||
      network?.roles?.[0],
    roles: network?.roles.filter(r => r.type !== RoleType.GUEST),
  }

  const onCompleted = async (formValues: UserImportFormProps) => {
    try {
      await client.invitations.invite({
        input: {
          invitees: formValues.entries.map(it => ({
            email: it.email,
            name: it.name,
          })),
          defaultSpacesIds: formValues.spaces.map(it => it.id),
          invitationMessage: formValues.customMessage || undefined,
          roleId: formValues.role?.id,
        },
      })
      toast({
        title: 'Your invitations are in the send queue and will go out shortly',
        status: 'success',
      })
      onClose()
    } catch (err) {
      toast({
        title: "Couldn't invite members",
        status: 'error',
      })
      console.error(err?.response?.errors)
    }
  }

  return (
    <UserImportContext.Provider value={context}>
      <Modal open={open} onClose={onClose} size="2xl">
        <Modal.Header title={`Invite to ${network?.name}`} />
        <Modal.Content>
          {isLoading ? (
            <div className="flex items-center justify-center h-32	">
              <SpinnerIcon className="animate-spin" />
            </div>
          ) : (
            <>
              <ShareInviteMemberLink url={invitationLink} />
              {context.hasInviteDefaultsPermission && isAdmin ? (
                <>
                  <Divider>Or invite manually</Divider>

                  <EmailVerificationBanner />

                  <UserImportForm onSubmit={onCompleted} onCancel={onClose} />
                </>
              ) : (
                <div className="mt-5">
                  <SocialShareButtons
                    url={invitationLink}
                    title={`Join me on ${network.name}!`}
                  />
                </div>
              )}
            </>
          )}
        </Modal.Content>
      </Modal>
    </UserImportContext.Provider>
  )
}
