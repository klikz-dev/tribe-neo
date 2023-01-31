import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Accordion } from '.'

describe('Accordion', () => {
  it('renders button', () => {
    render(
      <Accordion>
        <Accordion.Button>button</Accordion.Button>
        <Accordion.Panel>content</Accordion.Panel>
      </Accordion>,
    )

    expect(screen.getByText('button')).toBeInTheDocument()
    expect(screen.queryByText('content')).not.toBeInTheDocument()
  })

  it('expands content when clicked', async () => {
    render(
      <Accordion>
        <Accordion.Button>button</Accordion.Button>
        <Accordion.Panel>content</Accordion.Panel>
      </Accordion>,
    )

    userEvent.click(screen.getByText('button'))
    expect(await screen.findByText('content')).toBeInTheDocument()
  })
})
