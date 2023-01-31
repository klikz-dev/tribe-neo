import { useEffect, useState } from 'react'

const getValue = (search: string, param: string) =>
  new URLSearchParams(search).get(param)

export type UseQueryParam = (param: string) => string | null

const useSearchParamClient: UseQueryParam = param => {
  const { location } = window
  const [value, setValue] = useState<string | null>(() =>
    getValue(location.search, param),
  )

  useEffect(() => {
    const onChange = () => {
      setValue(getValue(location.search, param))
    }

    window.addEventListener('popstate', onChange)
    window.addEventListener('pushstate', onChange)
    window.addEventListener('replacestate', onChange)

    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('pushstate', onChange)
      window.removeEventListener('replacestate', onChange)
    }
  }, [location.search, param])

  return value
}

const useSearchParamServer = () => null

export const useSearchParam =
  typeof window !== 'undefined' ? useSearchParamClient : useSearchParamServer
