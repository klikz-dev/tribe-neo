import { AuthToken, CustomCodePosition } from '@tribeplatform/gql-client/types'

export const getCustomCodesScripts = (
  authToken: AuthToken,
): { headScripts: string; bodyScripts: string } => {
  const customCodes = authToken?.network?.customCodes
  if (!Array.isArray(customCodes) || customCodes?.length === 0) {
    return { headScripts: '', bodyScripts: '' }
  }

  return customCodes.reduce(
    (acc, curr) => {
      if (curr?.position === CustomCodePosition.HEAD) {
        acc.headScripts += curr.code
      } else {
        acc.bodyScripts += curr.code
      }
      return acc
    },
    {
      bodyScripts: '',
      headScripts: '',
    },
  )
}
