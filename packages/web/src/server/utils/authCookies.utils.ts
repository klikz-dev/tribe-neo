import Cookies, { SetOption } from 'cookies'
import { Request, Response } from 'express'
import { isSameSiteNoneCompatible } from 'should-send-same-site-none'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const AccessTokenMaxAge = 7 * 24 * 60 * 60 * 1000 // one week
export const RefreshTokenMaxAge = 12 * 30 * 24 * 60 * 60 * 1000 // one year

export const getSSRAuthCookies = ({
  req,
  res,
}: {
  req: Request
  res: Response
  accessToken?: string
  refreshToken?: string
}): {
  accessToken
  refreshToken
} => {
  const cookies = new Cookies(req, res)
  const accessToken = cookies.get(ACCESS_TOKEN)
  const refreshToken = cookies.get(REFRESH_TOKEN)
  return {
    accessToken,
    refreshToken,
  }
}
export const setSSRAuthCookies = ({
  refreshToken,
  accessToken,
  req,
  res,
}: {
  req: Request
  res: Response
  accessToken: string
  refreshToken: string
}): void => {
  const cookies = new Cookies(req, res)
  const ua = req.get('user-agent')
  const sameSite: SetOption['sameSite'] = isSameSiteNoneCompatible(ua)
    ? 'none'
    : 'lax'

  if (accessToken) {
    cookies.set(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      sameSite,
      maxAge: AccessTokenMaxAge,
    })
  }
  if (refreshToken) {
    cookies.set(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      sameSite,
      maxAge: RefreshTokenMaxAge,
    })
  }
}

export const resetSSRAuthCookies = ({
  req,
  res,
}: {
  req: Request
  res: Response
}) => {
  const cookies = new Cookies(req, res)
  cookies.set(REFRESH_TOKEN, '', {
    httpOnly: true,
    expires: new Date(0),
  })
  cookies.set(ACCESS_TOKEN, '', {
    httpOnly: true,
    expires: new Date(0),
  })
}
