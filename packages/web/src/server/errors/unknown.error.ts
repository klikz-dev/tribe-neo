import { ErrorResponse } from '@tribeplatform/gql-client/@types'

import { UnknownErrorType, ErrorCodes } from '../../@types'

export class UnkownServerError extends Error implements UnknownErrorType {
  readonly code = ErrorCodes.Unknown

  name = 'UnkownServerError'

  errors: ErrorResponse[]

  constructor(message?: string, errors?: ErrorResponse[]) {
    super(message)
    this.errors = errors
  }
}
