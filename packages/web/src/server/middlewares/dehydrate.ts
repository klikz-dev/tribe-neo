import { Request, Response, NextFunction } from 'express'
import { dehydrate as RqDehydrate } from 'react-query/hydration'

export const dehydrate = (req: Request, res: Response, next: NextFunction) => {
  const dehydratedState = RqDehydrate(res.locals.queryClient)

  res.locals.appInitialProps = {
    ...res.locals.appInitialProps,
    dehydratedState,
  }

  next()
}
