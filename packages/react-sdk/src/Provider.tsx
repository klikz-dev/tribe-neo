import merge from 'lodash.merge'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ProviderProps } from './@types'
import { ClientProvider } from './ClientProvider'

const defaultQueryConfigs: ProviderProps['queryConfig'] = {
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5min,
    },
  },
}

export const Provider = ({
  children,
  queryConfig,
  config,
  onTokenUpdate,
}: ProviderProps) => {
  const queryClient = new QueryClient(merge(defaultQueryConfigs, queryConfig))

  return (
    <ClientProvider config={config} onTokenUpdate={onTokenUpdate}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ClientProvider>
  )
}
