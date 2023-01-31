import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select, SelectProps } from '.'

describe('Select', () => {
  const foo = { id: '1' }
  const bar = { id: '2' }

  const onChange = jest.fn()

  const renderComponent = (
    props: Partial<SelectProps<any>> = { value: null, onChange },
  ) => {
    render(
      <Select value={props.value} onChange={props.onChange} {...props}>
        <Select.Button placeholder="placeholder"></Select.Button>
        <Select.Items>
          <Select.Item value={foo}>foo label</Select.Item>
          <Select.Item value={bar}>bar label</Select.Item>
        </Select.Items>
      </Select>,
    )
  }

  it('should display button placeholder', () => {
    render(
      <Select value={foo} onChange={onChange}>
        <Select.Button placeholder="placeholder">foo label</Select.Button>
      </Select>,
    )

    expect(screen.getByText('foo label')).toBeTruthy()
  })

  it('should display items when input clicked', () => {
    renderComponent()

    userEvent.click(screen.getByText('placeholder'))

    expect(screen.getByText('foo label')).toBeTruthy()
    expect(screen.getByText('bar label')).toBeTruthy()
  })

  it('should toggle items when button clicked twice', async () => {
    renderComponent()

    userEvent.click(screen.getByText('placeholder'))
    expect(screen.queryByText('foo label')).toBeTruthy()

    userEvent.click(screen.getByText('placeholder'))

    await waitForElementToBeRemoved(() => screen.queryByText('foo label'))
  })

  it('should call handler when changed', () => {
    renderComponent()

    userEvent.click(screen.getByText('placeholder'))
    userEvent.click(screen.getByText('bar label'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(bar)
  })
})
