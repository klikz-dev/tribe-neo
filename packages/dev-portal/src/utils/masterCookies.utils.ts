import JsCookies from 'js-cookie'

export const GLOBAL_TOKEN = 'globalToken'

export const getGlobalToken = (): string | undefined =>
  JsCookies.get(GLOBAL_TOKEN)
