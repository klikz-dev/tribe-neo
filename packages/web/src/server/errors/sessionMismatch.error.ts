import { ErrorResponse } from '@tribeplatform/gql-client/@types'

import { SessionMismatchErrorType, ErrorCodes } from '../../@types'

export class SessionMismatchError
  extends Error
  implements SessionMismatchErrorType
{
  readonly code = ErrorCodes.SessionMismatchError

  name = 'SessionMismatchError'

  community: string

  path: string

  errors: ErrorResponse[]

  constructor(community: string, path: string, errors?: ErrorResponse[]) {
    super(
      `user community did not match with the domain. Expected ${community}, got ${path}`,
    )
    this.community = community
    this.path = path
    this.errors = errors
  }
}
