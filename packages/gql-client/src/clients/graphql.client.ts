import { DocumentNode } from 'graphql'
import {
  ClientError as BaseClientError,
  GraphQLClient as BaseGraphQLClient,
} from 'graphql-request'

import { ClientError, ErrorResponse, ApiErrorCodes } from '../@types'
import { BASE_URL } from '../constants'
import { flattenErrors } from '../utils/error'
import { parseToken } from '../utils/token'

export type TribeClientOptions = {
  graphqlUrl?: string
  accessToken?: string
  clientId?: string
  clientSecret?: string
  notifyOnTokenExpiration?: boolean
  onError?: (errors: ErrorResponse[], client: GraphqlClient) => void
}

type RequestOptions = {
  query: string | DocumentNode
  variables?: Record<string, any>
  customToken?: string
  useBasicToken?: boolean
}

export class GraphqlClient extends BaseGraphQLClient {
  private accessToken?: string

  private clientId?: string

  private clientSecret?: string

  private notifyOnTokenExpiration: boolean

  private onError?: TribeClientOptions['onError']

  private tokenExpirationTimeout?: NodeJS.Timeout

  private tokenExpirationHandler(token) {
    clearTimeout(this.tokenExpirationTimeout)
    const parsedToken = parseToken(token)
    if (!parsedToken) {
      return
    }
    const diff =
      new Date(parsedToken.exp * 1000).getTime() - new Date().getTime()
    const timeout = diff - 60 * 1000 // invoke the error handler one minute sooner

    // This is due to setTimeout using a 32 bit int to store the delay so the max value allowed would be
    if (timeout > 2147483647) {
      return
    }

    this.tokenExpirationTimeout = setTimeout(() => {
      this.onError?.(
        [
          {
            code: ApiErrorCodes.INVALID_ACCESS_TOKEN,
            message: 'Invalid access token',
          },
        ],
        this,
      )
    }, timeout)
  }

  constructor(options: TribeClientOptions) {
    const {
      graphqlUrl = BASE_URL,
      accessToken,
      clientId,
      clientSecret,
    } = options
    super(graphqlUrl)

    this.accessToken = accessToken
    this.onError = options.onError
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.notifyOnTokenExpiration = !!options.notifyOnTokenExpiration

    if (this.notifyOnTokenExpiration) {
      this.tokenExpirationHandler(accessToken)
    }
  }

  private getBasicToken() {
    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    )
  }

  async authorizedRequest<T>(options: RequestOptions): Promise<T> {
    const {
      query,
      variables = {},
      customToken = null,
      useBasicToken = false,
    } = options
    if (useBasicToken) {
      this.setHeader('Authorization', `Basic ${this.getBasicToken()}`)
    } else {
      this.setHeader(
        'Authorization',
        `Bearer ${customToken || this.accessToken}`,
      )
    }
    return this.request<T>(query, variables).catch((error: BaseClientError) => {
      if (error?.response?.errors) {
        const normalizedError: Array<ErrorResponse> = flattenErrors(
          error.response.errors,
        )

        error.response.errors = normalizedError

        this.onError?.(normalizedError, this)
      }

      // eslint-disable-next-line no-throw-literal
      throw error as ClientError
    })
  }

  setToken(accessToken: string): void {
    this.accessToken = accessToken
    if (this.notifyOnTokenExpiration) {
      this.tokenExpirationHandler(accessToken)
    }
  }
}
