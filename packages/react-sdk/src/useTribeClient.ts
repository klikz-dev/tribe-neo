import { useContext } from 'react'

import { ClientContext } from './ClientProvider'

export const useTribeClient = () => {
  return useContext(ClientContext)
}
