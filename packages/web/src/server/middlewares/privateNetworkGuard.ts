import { Request, Response, NextFunction } from 'express'

import { NetworkVisibility, RoleType } from '@tribeplatform/gql-client/types'

import { isUrlPointsWithinApp } from '../../lib/app.lib'

export const privateNetworkGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { url, query } = req
  const { appInitialProps } = res.locals
  const {
    authToken: { role, network },
  } = appInitialProps

  // redirect guests to the login page if auth=true query param exists
  if (
    query?.auth === 'true' &&
    role.type === RoleType.GUEST &&
    isUrlPointsWithinApp(String(url))
  ) {
    res.redirect('/auth/login')
    return
  }

  // Checking for guests user visiting a private network
  if (
    network?.visibility === NetworkVisibility.PRIVATE &&
    role?.type === RoleType.GUEST &&
    isUrlPointsWithinApp(String(url))
  ) {
    res.redirect(`/auth/login`)
    return
  }

  next()
}
