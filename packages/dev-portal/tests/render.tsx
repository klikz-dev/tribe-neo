import { FC, ReactElement } from 'react'

import { render, RenderOptions } from '@testing-library/react'

import { Provider } from '@tribeplatform/react-sdk/Provider'

const AllTheProviders: FC = ({ children }) => {
  const config = {
    baseUrl: 'http://localhost/graphql',
    networkDomain: '',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  }
  const queryConfig = {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }

  return (
    <Provider config={config} queryConfig={queryConfig}>
      {children}
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(<AllTheProviders>{ui}</AllTheProviders>, { ...options })

export * from '@testing-library/react'
export { customRender as render }
