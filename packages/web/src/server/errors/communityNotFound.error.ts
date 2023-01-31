import { ErrorResponse } from '@tribeplatform/gql-client/@types'

import { CommunityNotFoundErrorType, ErrorCodes } from '../../@types'

export class CommunityNotFoundError
  extends Error
  implements CommunityNotFoundErrorType
{
  readonly code = ErrorCodes.CommunityNotFound

  name = 'CommunityNotFound'

  community: string

  url: string

  errors: ErrorResponse[]

  constructor(community: string, url: string, errors?: ErrorResponse[]) {
    super(`community not found: ${community}`)
    this.community = community
    this.url = url
    this.errors = errors
  }
}
