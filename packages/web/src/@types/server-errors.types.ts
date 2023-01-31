import { ErrorResponse } from '@tribeplatform/gql-client/@types'

export enum ErrorCodes {
  Unknown = 500,
  CommunityNotFound = 101,
  CommunityUnavailable = 102,
  SessionMismatchError = 103,
}

export interface BaseServerErrorType extends Error {
  readonly code: ErrorCodes
  errors: ErrorResponse[]
}

export interface UnknownErrorType extends BaseServerErrorType {
  code: ErrorCodes.Unknown
}

export interface CommunityNotFoundErrorType extends BaseServerErrorType {
  code: ErrorCodes.CommunityNotFound
  community: string
  url: string
}

export interface CommunityUnavailableErrorType extends BaseServerErrorType {
  code: ErrorCodes.CommunityUnavailable
  community: string
}

export interface SessionMismatchErrorType extends BaseServerErrorType {
  code: ErrorCodes.SessionMismatchError

  // The community domain that was granted for the session
  community: string

  // The community that was requested
  path: string
}

export type ServerError =
  | UnknownErrorType
  | CommunityNotFoundErrorType
  | CommunityUnavailableErrorType
  | SessionMismatchErrorType
