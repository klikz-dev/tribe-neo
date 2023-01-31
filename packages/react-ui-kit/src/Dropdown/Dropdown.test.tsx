import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Dropdown, DropdownProps } from '.'

describe('Dropdown', () => {
  const defaultProps: DropdownProps = {}

  const item1Mock = jest.fn()
  const item2Mock = jest.fn()

  const renderComponent = () => {
    render(
      <Dropdown {...defaultProps}>
        <Dropdown.Button>Actions</Dropdown.Button>
        <Dropdown.Items>
          <Dropdown.Item onClick={item1Mock}>Item 1</Dropdown.Item>
          <Dropdown.Item onClick={item2Mock}>Item 2</Dropdown.Item>
        </Dropdown.Items>
      </Dropdown>,
    )
  }

  it('should render button', () => {
    renderComponent()

    expect(screen.getByText('Actions')).toBeVisible()

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
  })

  it('should display options when clicked', async () => {
    renderComponent()

    userEvent.click(screen.getByText('Actions'))

    expect(await screen.findByText('Item 1')).toBeInTheDocument()
    expect(await screen.findByText('Item 2')).toBeInTheDocument()
  })

  it('should call handler when clicked', async () => {
    renderComponent()

    userEvent.click(screen.getByText('Actions'))
    userEvent.click(await screen.findByText('Item 1'))

    expect(item1Mock).toHaveBeenCalledTimes(1)
  })
})
