import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../../../tests/render'
import { AppsContainer } from './AppsContainer'

describe('AppsContainer', () => {
  const renderComponent = () => {
    render(<AppsContainer />)
  }

  it('renders all apps', async () => {
    renderComponent()

    expect(await screen.findByText('App 1')).toBeInTheDocument()
    expect(screen.getByText('App 1 description')).toBeInTheDocument()

    expect(screen.getByText('App 2')).toBeInTheDocument()
    expect(screen.getByText('App 2 description')).toBeInTheDocument()
  })

  it('renders create new app card', async () => {
    renderComponent()

    expect(screen.getByText('Create a new app')).toBeInTheDocument()
  })

  it('changes location after click on create new app', async () => {
    renderComponent()

    userEvent.click(screen.getByText('Create a new app'))

    await waitFor(() => {
      expect(window.location.pathname).toBe(`/apps/create`)
    })
  })

  it('changes location after click on app card', async () => {
    renderComponent()

    userEvent.click(await screen.findByText('App 1'))

    expect(window.location.pathname).toBe(`/apps/app-1/information`)
  })
})
