import {
  useMutation as rqUseMutation,
  UseMutationOptions as RQUseMutationOptions,
  UseMutateAsyncFunction as RQUseMutateAsyncFunction,
} from 'react-query'
import { MutationFunction } from 'react-query/types/core/types'
import { UseMutationResult } from 'react-query/types/react/types'

export type UseMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = RQUseMutationOptions<TData, TError, TVariables, TContext>

type useMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn?: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
) => UseMutationResult<TData, TError, TVariables, TContext>

export const useMutation: useMutation = (mutationFn, options) => {
  return rqUseMutation(mutationFn, options)
}

export type UseMutateAsyncFunction<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = RQUseMutateAsyncFunction<TData, TError, TVariables, TContext>
