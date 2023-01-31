import { ClientError as CError } from 'graphql-request'

export enum ApiErrorCodes {
  UNKNOWN_ERROR = 1,
  SERVER_ERROR = 10,
  PARAMETER_VALIDATION_FAILED = 100,
  PERMISSION_ERROR = 102,
  USER_REQUEST_REACHED = 104,
  INVALID_PARAMETER = 106,
  INVALID_ACCESS_TOKEN = 108,
  RESOURCE_NOT_FOUND = 110,
  MISSING_PARAMETER = 112,
  PARAMETER_TYPE_PROBLEM = 114,
  DATABASE_ERROR = 116,
  INVALID_REQUEST = 118,
  REQUEST_BLOCKED_FOR_POLICIES = 120,
  BACKEND_ERROR = 122,
}

export type ErrorResponse = {
  code: ApiErrorCodes
  field?: string
  message: string
  subcode?: string
  help?: string
  timestamp?: string
}

interface ClientResponse<T = any> {
  data?: T
  errors?: ErrorResponse[]
  extensions?: any
  status: number
  [key: string]: any
}

export type ClientError = Omit<CError, 'response'> & {
  response: ClientResponse
}

export type ClientAttachmentError = {
  fileName: string
  message?: string
}

export type ClientAttachmentErrorHandler = (
  error: ClientAttachmentError,
) => void
