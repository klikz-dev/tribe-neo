import {
  QueryFunction,
  QueryKey,
  useQuery as rqUseQuery,
  UseQueryOptions as RQUseQueryOptions,
  UseQueryResult,
} from 'react-query'

import { useTribeClient } from '../useTribeClient'

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = RQUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>

type useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => UseQueryResult<TData, TError>

export const useQuery: useQuery = (key, fetchFn, options) => {
  const { ready } = useTribeClient()
  return rqUseQuery(key, fetchFn, {
    enabled: !ready ? false : options?.enabled,
    ...options,
  })
}
