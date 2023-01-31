import { Keys } from '@tribeplatform/react-sdk/lib'

import { PageProps } from '../../@types'

export const getAcceptPageData = async ({ context }: PageProps) => {
  const { client, queryClient, req, res } = context

  const { token } = req.query
  if (token) {
    try {
      const validation = await client.invitations.validate({
        token: String(token),
      })
      queryClient.setQueryData(
        Keys.getMemberInvitationValidity(token),
        validation,
      )
      return
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  res.redirect('/auth/signup')
}
