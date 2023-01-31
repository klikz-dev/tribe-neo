import '@testing-library/jest-dom/extend-expect'
import { server } from './mocks/server'

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
})
// server.printHandlers()

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.setTimeout(20000) // in milliseconds
