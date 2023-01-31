import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tabs } from '.'

describe('Tabs', () => {
  const onChange = jest.fn()

  const renderComponent = () => {
    render(
      <Tabs.Group onChange={onChange}>
        <Tabs.List>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs.Group>,
    )
  }

  it('should display tabs', () => {
    renderComponent()

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
  })

  it('should display first panel by default', () => {
    renderComponent()

    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('should change panels tab clicked', () => {
    renderComponent()

    userEvent.click(screen.getByText('Tab 2'))

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('should call onChange', async () => {
    renderComponent()

    userEvent.click(screen.getByText('Tab 2'))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    expect(onChange).toHaveBeenCalledWith(1)
  })
})
