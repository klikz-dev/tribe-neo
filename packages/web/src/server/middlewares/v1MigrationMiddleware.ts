import axios from 'axios'
import { Request, Response } from 'express'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

import { RuntimeConfigs } from '../../config'

const GET_REDIRECT_URL = gql`
  query getRedirectUrl($url: String!) {
    getRedirectUrl(url: $url) {
      resolvedUrl
      url
    }
  }
`

export const v1MigrationRedirect = async (req: Request, res: Response) => {
  try {
    if (RuntimeConfigs.TRIBE_GQL_ENDPOINT) {
      const url = `${req.hostname}${req.originalUrl}`
      const response = await axios.post(RuntimeConfigs.TRIBE_GQL_ENDPOINT, {
        query: print(GET_REDIRECT_URL),
        variables: {
          url,
        },
      })
      const { resolvedUrl: redirectUrl } =
        response?.data?.data?.getRedirectUrl || {}

      if (typeof redirectUrl === 'string' && redirectUrl.length > 0) {
        res.redirect(redirectUrl)
        return
      }
    }
  } catch (e) {
    console.error('v1 migration getRedirectUrl query error', e)
  }

  res.redirect('/404')
}
