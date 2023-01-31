import { screen } from '@testing-library/react'

import { render } from '../../../tests/render'
import { CreateAppContainer } from './CreateAppContainer'

describe('CreateAppContainer', () => {
  const renderComponent = () => {
    render(<CreateAppContainer />)
  }

  it('renders modal', async () => {
    renderComponent()

    expect(screen.getByText('Create a new app')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create app' }),
    ).toBeInTheDocument()
  })
})
