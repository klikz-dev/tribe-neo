import { NetworkReleaseChannelType } from '@tribeplatform/gql-client/types'

enum cookieValue {
  unset = '_',
  never = 'never',
  network = 'network',
  session = 'session',

  /** @deprecated */
  always = 'always',
}

type ReleaseCheckResult = {
  setCookie: string | false
  message?: string
}

const routingTable: Record<
  NetworkReleaseChannelType,
  Record<cookieValue, ReleaseCheckResult>
> = {
  [NetworkReleaseChannelType.STABLE]: {
    [cookieValue.unset]: {
      setCookie: false,
      message: `unusual traffic to edge release with unset cookie (probably forwarded by a proxy server)`,
    },
    [cookieValue.never]: {
      setCookie: false,
      message: `unusual traffic to edge release with cookie: "never" (probably forwarded by a proxy server)`,
    },
    [cookieValue.network]: {
      setCookie: cookieValue.never,
    },
    [cookieValue.session]: {
      setCookie: false,
    },
    [cookieValue.always]: {
      setCookie: cookieValue.session,
    },
  },
  [NetworkReleaseChannelType.EDGE]: {
    [cookieValue.unset]: {
      setCookie: false,
      message: `unusual traffic to edge release with unset cookie (probably forwarded by a proxy server)`,
    },
    [cookieValue.never]: {
      setCookie: false,
      message: `unusual traffic to edge release with cookie: "never" (probably forwarded by a proxy server)`,
    },
    [cookieValue.network]: {
      setCookie: false,
    },
    [cookieValue.session]: {
      setCookie: false,
    },
    [cookieValue.always]: {
      setCookie: cookieValue.session,
    },
  },
}

export const checkRelease = (
  remote: NetworkReleaseChannelType,
  current: cookieValue | string,
): ReleaseCheckResult =>
  routingTable[remote]?.[current || cookieValue.unset] || {
    setCookie: false,
    message: `cookie value is not recognized: ${current}`,
  }
