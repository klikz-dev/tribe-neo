import { Request, Response, NextFunction } from 'express'

import { RoleType } from '@tribeplatform/gql-client/types'

export const redirectIfLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const appProps = res.locals?.appInitialProps
  if (appProps?.authToken?.role?.type !== RoleType.GUEST) {
    res.redirect('/')
  } else {
    next()
  }
}
