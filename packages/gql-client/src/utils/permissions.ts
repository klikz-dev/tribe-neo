import {
  ActionPermissions,
  Space,
  Post,
  Member,
  Network,
  InputPathPermissions,
  ValuePermissions,
} from '../types'
import * as Types from './permission.constant'

export type ApolloApis = Types.ApolloApis

export const hasScopesPermission = (
  permissions:
    | ActionPermissions[]
    | Partial<Space>
    | Partial<Post>
    | Partial<Network>
    | Partial<Member>,
  scopes: string[],
): boolean[] => {
  const perms = Array.isArray(permissions)
    ? permissions
    : permissions?.authMemberProps?.permissions

  return scopes.map(s => {
    const has = perms?.find(p => (p.name as ApolloApis) === s)
    return Boolean(has?.isAuthorized?.authorized)
  })
}

type hasActionPermission = (
  permissions: ActionPermissions[] | undefined,
  scope: ApolloApis,
) => {
  authorized: boolean
  reason: ActionPermissions['isAuthorized']['reason']
  requiredPlan: ActionPermissions['isAuthorized']['requiredPlan']
  actionPermission: ActionPermissions
}

export const hasActionPermission: hasActionPermission = (
  permissions = [],
  scope,
) => {
  const has = permissions?.find(p => (p.name as ApolloApis) === scope)

  return {
    authorized: Boolean(has?.isAuthorized?.authorized),
    reason: has?.isAuthorized?.reason,
    requiredPlan: has?.isAuthorized?.requiredPlan,
    actionPermission: has,
  }
}

type hasValuePermission = (
  permissions: ValuePermissions[],
  value: string,
) => {
  authorized: boolean
  reason: ValuePermissions['isAuthorized']['reason']
  requiredPlan: ValuePermissions['isAuthorized']['requiredPlan']
  value: ValuePermissions['value']
  valuePermission: ValuePermissions
}

export const hasValuePermission: hasValuePermission = (
  permissions = [],
  value,
) => {
  const has = permissions?.find(p => p.value === value)

  return {
    authorized: Boolean(has?.isAuthorized?.authorized),
    reason: has?.isAuthorized?.reason,
    requiredPlan: has?.isAuthorized?.requiredPlan,
    value: has?.value,
    valuePermission: has,
  }
}

type hasInputPermission = (
  permissions: InputPathPermissions[],
  path: string,
) => {
  authorized: boolean
  reason: InputPathPermissions['isAuthorized']['reason']
  requiredPlan: InputPathPermissions['isAuthorized']['requiredPlan']
  values: ValuePermissions[]
  inputPermission: InputPathPermissions
}

export const hasInputPermission: hasInputPermission = (
  permissions = [],
  path,
) => {
  const has = permissions?.find(p => p.path === path)

  return {
    authorized: Boolean(has?.isAuthorized?.authorized),
    reason: has?.isAuthorized?.reason,
    requiredPlan: has?.isAuthorized?.requiredPlan,
    values: has?.values,
    inputPermission: has,
  }
}
