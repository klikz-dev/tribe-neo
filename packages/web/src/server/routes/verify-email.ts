import { Request, Response, NextFunction } from 'express'

import { MemberStatus, RoleType } from '@tribeplatform/gql-client/types'

import { setSSRAuthCookies } from '../utils/authCookies.utils'

export const getVerifyPageData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { verificationCode, memberId } = req.query
  const { client } = res.locals

  if (verificationCode && memberId) {
    try {
      const verifyResult = await client.auth.verifyMember(
        {
          input: {
            memberId: String(memberId),
            verificationCode: String(verificationCode),
          },
        },
        'default',
      )

      const {
        accessToken,
        refreshToken,
        role: newRole,
        member: newMember,
      } = verifyResult || {}

      if (refreshToken || accessToken) {
        setSSRAuthCookies({
          req,
          res,
          refreshToken: refreshToken ? String(refreshToken) : '',
          accessToken: accessToken ? String(accessToken) : '',
        })
      }

      if (
        newRole?.type !== RoleType.GUEST &&
        newMember?.status === MemberStatus.VERIFIED
      ) {
        const redirect =
          req.path === '/auth/verify-email' ? '/settings/account' : '/'
        res.redirect(redirect)
        return
      }
    } catch (e) {
      console.warn(
        'could not verify user email',
        { verificationCode, memberId },
        e,
      )
    }
  }
  next()
}
