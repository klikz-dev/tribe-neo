import path from 'path'

import { Request, Response, NextFunction } from 'express'

import { ServerError, ErrorCodes } from '../../@types'

export const errorHandler = (
  error: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error)
  }

  console.error(error)

  res.status(500)

  switch (error.code) {
    case ErrorCodes.CommunityNotFound:
      res.sendFile(path.resolve('./public/html/community-not-found.html'))
      return
    case ErrorCodes.CommunityUnavailable:
      res.sendFile(path.resolve('./public/html/community-not-found.html'))
      return
    case ErrorCodes.SessionMismatchError:
      res.redirect(`https://${error.community}${error.path}`)
      return
    default:
      res.sendFile(path.resolve('./public/html/community-not-found.html'))
  }
}
