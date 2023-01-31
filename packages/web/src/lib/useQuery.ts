import { useLocation } from 'react-router-dom'

export const useQuery = (): Record<string, string> => {
  const urlSearchParams = new URLSearchParams(useLocation().search)
  const queryParams = {}
  urlSearchParams.forEach((value, key) => {
    queryParams[key] = value
  })
  return queryParams
}
