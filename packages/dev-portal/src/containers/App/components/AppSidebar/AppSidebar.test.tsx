import { screen } from '@testing-library/react'

import { render } from '../../../../../tests/render'
import { AppSidebar } from './AppSidebar'

describe('AppSidebar', () => {
  const renderComponent = () => {
    render(<AppSidebar />)
  }

  describe('navigation', () => {
    it('has app information link', async () => {
      renderComponent()

      expect(screen.getByText(`App Information`)).toBeInTheDocument()
      expect(screen.getByText(`Credentials`)).toBeInTheDocument()
      expect(screen.getByText(`Collaborators`)).toBeInTheDocument()
      expect(screen.getByText(`Webhooks`)).toBeInTheDocument()
      expect(screen.getByText(`Test and publish`)).toBeInTheDocument()
    })
  })
})
