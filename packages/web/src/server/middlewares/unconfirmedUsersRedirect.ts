import { Request, Response, NextFunction } from 'express'

import { isMemberNotConfirmed, isUrlPointsWithinApp } from '../../lib/app.lib'

export const unconfirmedUsersRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { url } = req
  const {
    appInitialProps: {
      authToken: { member, role },
    },
  } = res.locals

  if (isMemberNotConfirmed(member, role) && isUrlPointsWithinApp(String(url))) {
    res.redirect(`/auth/verify?memberId=${member.id}`)
    return
  }
  next()
}
