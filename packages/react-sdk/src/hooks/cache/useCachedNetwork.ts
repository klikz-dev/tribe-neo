import {
  NavigationSlates,
  Network,
  Slate,
} from '@tribeplatform/gql-client/types'

export const networkUpdater = newNetwork => old => {
  let network = newNetwork
  if (typeof newNetwork === 'function') {
    network = newNetwork(old)
  }
  return {
    ...old,
    ...network,
  }
}

export const authTokenUpdater = newAuthToken => old => {
  return {
    ...old,
    ...newAuthToken,
    network: networkUpdater(newAuthToken?.network)(old.network),
  }
}

export const navigationSlateReducer = (
  network: Network,
  updatedSlateIds: string[],
  slates: Slate[],
) =>
  Object.keys(network.navigationSlates)
    .map(key => {
      const slate = network.navigationSlates[key]
      if (!slate) return undefined

      if (updatedSlateIds.includes(slate.id)) {
        return { [key]: slates.find(s => s.id === slate.id) }
      }
      return { [key]: slate }
    })
    .reduce(
      (preValue, value) => ({ ...preValue, ...value }),
      network.navigationSlates,
    ) as NavigationSlates
