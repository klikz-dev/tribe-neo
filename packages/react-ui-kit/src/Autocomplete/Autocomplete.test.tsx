import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Autocomplete } from '.'

describe('Autocomplete', () => {
  const user1 = {
    name: 'Wade Cooper',
  }
  const user2 = {
    name: 'Arlene Mccoy',
  }

  const onChange = jest.fn()
  const onInputChange = jest.fn()
  const onEnter = jest.fn()

  const renderComponent = (props: any = {}) => {
    const {
      options = [user1, user2],
      selectedOptions = [],
      loading = false,
      ...rest
    } = props

    render(
      <Autocomplete
        value={selectedOptions}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        itemToString={({ name }) => name}
        loading={loading}
        {...rest}
      >
        <Autocomplete.Input placeholder="Add people" onEnter={onEnter} />
        <Autocomplete.Items>
          {options.map((person, index) => (
            <Autocomplete.Item key={person.name} value={person} index={index}>
              {person.name}
            </Autocomplete.Item>
          ))}
          {loading && (
            <Autocomplete.ItemsEmpty>Loading...</Autocomplete.ItemsEmpty>
          )}
          {!loading && options.length === 0 && (
            <Autocomplete.ItemsEmpty>No results</Autocomplete.ItemsEmpty>
          )}
        </Autocomplete.Items>
      </Autocomplete>,
    )
  }

  it('should display input placeholder', () => {
    renderComponent()

    expect(screen.getByPlaceholderText('Add people')).toBeInTheDocument()
  })

  it('should display options when input clicked', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')
    userEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText(user1.name)).toBeInTheDocument()
    expect(await screen.findByText(user2.name)).toBeInTheDocument()
  })

  it('should call handler when option selected', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')
    userEvent.click(screen.getByRole('combobox'))

    userEvent.click(within(screen.getByRole('listbox')).getByText(user2.name))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(user2)
    })
  })

  it('should call onInputChange listener when input changes', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')

    await waitFor(() => {
      expect(onInputChange).toHaveBeenCalledTimes(1)
    })

    expect(onInputChange).toHaveBeenCalledWith('new value')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should display empty results', async () => {
    renderComponent({ options: [] })

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')
    userEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('should display loading state', async () => {
    renderComponent({ loading: true })

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')
    userEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText('Loading...')).toBeInTheDocument()
  })

  it('should clear input value on input blur', async () => {
    renderComponent()

    userEvent.click(screen.getByRole('combobox'))
    userEvent.paste(screen.getByPlaceholderText('Add people'), 't')
    expect(screen.getByDisplayValue('t')).toBeInTheDocument()

    userEvent.tab()
    await waitFor(() => {
      expect(screen.queryByDisplayValue('t')).not.toBeInTheDocument()
    })
  })

  it('should call onEnter listener when no item selected', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')
    userEvent.type(screen.getByPlaceholderText('Add people'), '{enter}')

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalledTimes(1)
    })

    expect(onEnter).toHaveBeenCalledWith({
      highlightedIndex: -1,
      inputValue: 'new value',
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call onEnter listener when item is highlighted', async () => {
    renderComponent()

    userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')
    userEvent.type(screen.getByPlaceholderText('Add people'), '{arrowdown}')
    userEvent.type(screen.getByPlaceholderText('Add people'), '{enter}')

    await waitFor(() => {
      expect(onEnter).toHaveBeenCalledTimes(1)
    })

    expect(onEnter).toHaveBeenCalledWith({
      highlightedIndex: 0,
      inputValue: 'new value',
    })
    expect(onChange).toHaveBeenCalledWith(user1)
  })
})
