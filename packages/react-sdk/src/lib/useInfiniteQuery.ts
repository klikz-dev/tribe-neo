import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery as rqUseInfiniteQuery,
  UseInfiniteQueryOptions as RQUseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query'

import { useTribeClient } from '../useTribeClient'

export type UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = RQUseInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey
>

type useInfiniteQuery = <
  TQueryFnData extends {
    pageInfo: {
      endCursor?: string
    }
  },
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  >,
) => UseInfiniteQueryResult<TData, TError>

export const useInfiniteQuery: useInfiniteQuery = (
  queryKey,
  queryFn,
  options,
) => {
  const { ready } = useTribeClient()
  return rqUseInfiniteQuery(queryKey, queryFn, {
    enabled: !ready ? false : options?.enabled,
    getNextPageParam: lastPage => {
      // Return undefined to indicate there is no next page available.
      if (!(lastPage?.pageInfo as any)?.hasNextPage) return undefined

      return lastPage.pageInfo.endCursor || undefined
    },
    ...options,
  })
}
