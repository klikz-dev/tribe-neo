import JsCookies from 'js-cookie'

export const GLOBAL_TOKEN = 'globalToken'

export const getGlobalToken = (): string | undefined =>
  JsCookies.get(GLOBAL_TOKEN)

export const setGlobalAuthCookies = ({
  globalToken,
}: {
  globalToken?: string
}) => {
  if (globalToken) {
    const { hostname } = window.location
    const domain = hostname.substring(hostname.indexOf('.') + 1)

    JsCookies.set(GLOBAL_TOKEN, globalToken, {
      httpOnly: false,
      domain,
    })
  }
}

export const resetGlobalAuthCookies = () => {
  /*
      IMPORTANT! When deleting a cookie and you're not relying on the default attributes,
      you must pass the exact same path and domain attributes that were used to set the cookie
    */
  const { hostname } = window.location
  const domain = hostname.substring(hostname.indexOf('.') + 1)

  JsCookies.remove(GLOBAL_TOKEN, { domain })
}
