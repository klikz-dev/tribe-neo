import { Request, Response, NextFunction } from 'express'

import { AppContext } from '../../@types'
import { prefetchPageInitialData } from '../utils/prefetchPageInitialData'

export const dataPrefetch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appInitialProps, queryClient } = res.locals
  const context: AppContext = {
    req,
    res,
    queryClient,
  }

  if (appInitialProps) {
    await prefetchPageInitialData(context)
  }

  // check if we have redirected within the renderApp or not
  if (res.writableEnded) {
    return
  }

  next()
}
