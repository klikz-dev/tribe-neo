import { useState } from 'react'

import { useTribeClient } from '../../useTribeClient'

export const useDomainAvailability = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { client } = useTribeClient()

  const checkDomainAvailability = async (domain: string) => {
    setIsLoading(true)
    const data = await client.network.domainAvailability({ input: { domain } })
    setIsLoading(false)
    return data
  }

  return { checkDomainAvailability, isLoading }
}
