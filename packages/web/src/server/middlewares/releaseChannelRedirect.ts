import Cookies from 'cookies'
import { Request, Response, NextFunction } from 'express'

import { checkRelease } from '../utils/checkRelease'

export const releaseChannelRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    appInitialProps: {
      authToken: {
        network: { releaseChannel },
      },
    },
  } = res.locals
  const cookies = new Cookies(req, res)
  const { setCookie, message } = checkRelease(
    releaseChannel,
    cookies.get('neo-ui'),
  )
  if (message) {
    console.warn(`[release channel handler]: ${message}`)
  }
  if (setCookie) {
    res
      .cookie('neo-ui', setCookie, {
        httpOnly: true,
        maxAge: 2678400000, // 1 Month
      })
      .redirect(302, 'back')
    return
  }
  next()
}
