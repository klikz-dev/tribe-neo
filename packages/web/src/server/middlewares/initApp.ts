import { Request, Response, NextFunction } from 'express'

import { QueryClient } from '@tribeplatform/react-sdk/lib'

import { AppContext, AppInitialProps } from '../../@types'
import { getAppInitialProps } from '../utils/getAppInitialProps'

export const initializeApp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const queryClient = new QueryClient()
  const context: AppContext = {
    req,
    res,
    queryClient,
  }
  const appInitialProps: AppInitialProps | void = await getAppInitialProps(
    context,
  )

  // check if we have redirected within the renderApp or not
  if (res.writableEnded) {
    return
  }

  res.locals.client = context.client
  res.locals.queryClient = context.queryClient
  res.locals.appInitialProps = {
    ...(appInitialProps as AppInitialProps),
  }

  next()
}
