import { Keys } from '@tribeplatform/react-sdk/lib'

import { PageProps } from '../../@types'

export const getJoinPageData = async ({ context, path }: PageProps) => {
  const { client, queryClient, res } = context

  const { id: inviteId } = path.params || {}
  if (inviteId) {
    try {
      const validation = await client.invitations.validateLink({
        id: String(inviteId),
      })
      queryClient.setQueryData(
        Keys.getMemberInvitationLinkValidity(inviteId),
        validation,
      )
      return
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  res?.redirect('/auth/signup')
}
