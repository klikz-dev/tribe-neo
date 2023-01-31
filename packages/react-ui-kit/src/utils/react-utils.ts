import {
  isValidElement,
  Children,
  useCallback,
  useRef,
  useState,
  ReactNode,
  ReactElement,
} from 'react'

export function getValidChildren(children: ReactNode) {
  return Children.toArray(children).filter(child =>
    isValidElement(child),
  ) as ReactElement[]
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === 'function'
}

export function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export function useGetLatest<T>(val: T) {
  const ref = useRef<T>(val)
  ref.current = val
  return useCallback(() => ref.current, [])
}

const noop = () => {
  // do nothing
}

export function useControlledState<T>({
  initial,
  value,
  onChange = noop,
}: {
  initial?: T
  value?: T
  onChange?: (state: T) => void
}): [T, (state: T) => void] {
  if (initial === undefined && value === undefined) {
    throw new TypeError(
      'Either "value" or "initial" variable must be set. Now both are undefined',
    )
  }

  const [state, setState] = useState(initial)

  const getLatest = useGetLatest(state)

  const set = useCallback(
    (updater: T) => {
      const state = getLatest()

      const updatedState =
        typeof updater === 'function' ? updater(state) : updater

      if (typeof updatedState.persist === 'function') updatedState.persist()

      setState(updatedState)
      if (typeof onChange === 'function') onChange(updatedState)
    },
    [getLatest, onChange],
  )

  const isControlled = value !== undefined

  return [isControlled ? value! : state!, isControlled ? onChange : set]
}
