import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchableSelect } from '.'

describe('SearchableSelect', () => {
  const user1 = {
    name: 'Wade Cooper',
  }
  const user2 = {
    name: 'Arlene Mccoy',
  }

  const onChange = jest.fn()
  const onInputChange = jest.fn()

  const renderComponent = (props: any = {}) => {
    const {
      options = [user1, user2],
      value = null,
      loading = false,
      ...rest
    } = props

    render(
      <SearchableSelect
        value={value}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        {...rest}
      >
        <SearchableSelect.Button placeholder="Select person">
          {value?.name}
        </SearchableSelect.Button>
        <SearchableSelect.Items>
          {options.map((person, index) => (
            <SearchableSelect.Item
              key={person.name}
              value={person}
              index={index}
            >
              {person.name}
            </SearchableSelect.Item>
          ))}
          {loading && (
            <SearchableSelect.ItemsEmpty>
              Loading...
            </SearchableSelect.ItemsEmpty>
          )}
          {!loading && options.length === 0 && (
            <SearchableSelect.ItemsEmpty>
              No results
            </SearchableSelect.ItemsEmpty>
          )}
        </SearchableSelect.Items>
      </SearchableSelect>,
    )
  }

  it('should display input placeholder', () => {
    renderComponent()

    expect(screen.getByPlaceholderText('Select person')).toBeInTheDocument()
  })

  it('should display options when input clicked', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Select person'), 'new value')
    userEvent.click(screen.getByRole('listbox'))

    expect(await screen.findByText(user1.name)).toBeInTheDocument()
    expect(await screen.findByText(user2.name)).toBeInTheDocument()
  })

  it('should call handler when option selected', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Select person'), 'new value')
    userEvent.click(screen.getByRole('listbox'))

    userEvent.click(within(screen.getByRole('listbox')).getByText(user2.name))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(user2)
    })
  })

  it('should call onInputChange listener when input changes', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Select person'), 'new value')

    await waitFor(() => {
      expect(onInputChange).toHaveBeenCalledTimes(1)
    })

    expect(onInputChange).toHaveBeenCalledWith('new value')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should display empty results', async () => {
    renderComponent({ options: [] })

    userEvent.paste(screen.getByPlaceholderText('Select person'), 'new value')
    userEvent.click(screen.getByRole('listbox'))

    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('should display loading state', async () => {
    renderComponent({ loading: true })

    userEvent.paste(screen.getByPlaceholderText('Select person'), 'new value')
    userEvent.click(screen.getByRole('listbox'))

    expect(await screen.findByText('Loading...')).toBeInTheDocument()
  })

  it('should clear input value on input blur', async () => {
    renderComponent()

    userEvent.click(screen.getByRole('listbox'))
    userEvent.paste(screen.getByPlaceholderText('Select person'), 't')
    expect(screen.getByDisplayValue('t')).toBeInTheDocument()

    userEvent.tab()
    await waitFor(() => {
      expect(screen.queryByDisplayValue('t')).not.toBeInTheDocument()
    })
  })
})
