import axios from 'axios'
import { Request, Response } from 'express'
import { print } from 'graphql/language/printer'

import { logoutMutation } from '@tribeplatform/gql-client/graphql'

import { RuntimeConfigs } from '../../../config'
import { resetSSRAuthCookies } from '../../utils/authCookies.utils'

export const logout = async (req: Request, res: Response) => {
  if (!RuntimeConfigs.TRIBE_GQL_ENDPOINT) {
    console.warn('BaseUrl is not defined')
    res.status(500).send('Something went wrong')
    return
  }

  try {
    const response = await axios.post(
      RuntimeConfigs.TRIBE_GQL_ENDPOINT,
      { query: print(logoutMutation()) },
      {
        headers: {
          authorization: req.headers.authorization,
        },
      },
    )

    resetSSRAuthCookies({ req, res })
    res.status(200).json(response.data)
    return
  } catch (e) {
    console.warn('Could not logout', e)
  }
  resetSSRAuthCookies({ req, res })
  res.status(500).send('Something went wrong')
}
