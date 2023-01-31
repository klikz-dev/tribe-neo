import { ErrorResponse } from '@tribeplatform/gql-client/@types'

import { CommunityUnavailableErrorType, ErrorCodes } from '../../@types'

export class CommunityUnavailableError
  extends Error
  implements CommunityUnavailableErrorType
{
  readonly code = ErrorCodes.CommunityUnavailable

  name = 'CommunityUnavailable'

  community: string

  errors: ErrorResponse[]

  constructor(community: string, errors?: ErrorResponse[]) {
    super(`community not found: ${community}`)
    this.community = community
    this.errors = errors
  }
}
