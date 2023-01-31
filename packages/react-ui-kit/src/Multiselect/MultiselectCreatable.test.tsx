import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MultiselectCreatable } from '.'

describe('MultiselectCreatable', () => {
  const user1 = 'Wade Cooper'
  const user2 = 'Tom Cook'
  const user3 = 'Tanya Fox'

  const onChange = jest.fn()
  const onInputChange = jest.fn()
  const onCreateItem = jest.fn()

  const renderComponent = (props: any = {}) => {
    const {
      options = [user1, user2, user3],
      selectedOptions = [],
      ...rest
    } = props

    render(
      <MultiselectCreatable
        value={selectedOptions}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        searchable
        onCreateItem={onCreateItem}
        {...rest}
      >
        <MultiselectCreatable.Button placeholder="Add people">
          {selectedOptions.map((person, index) => (
            <MultiselectCreatable.SelectedItem
              key={person}
              value={person}
              index={index}
            >
              {person}
            </MultiselectCreatable.SelectedItem>
          ))}
        </MultiselectCreatable.Button>
        <MultiselectCreatable.Items>
          {({ creating, inputValue }) => {
            return (
              <>
                {creating && inputValue?.length > 0 && (
                  <MultiselectCreatable.Item value={inputValue} index={0}>
                    {`Create ${inputValue}`}
                  </MultiselectCreatable.Item>
                )}
                {options.map((person, index) => (
                  <MultiselectCreatable.Item
                    key={person}
                    value={person}
                    index={index}
                  >
                    {person}
                  </MultiselectCreatable.Item>
                ))}
              </>
            )
          }}
        </MultiselectCreatable.Items>
      </MultiselectCreatable>,
    )
  }

  it('should display button placeholder', () => {
    renderComponent()

    expect(screen.getByPlaceholderText('Add people')).toBeInTheDocument()
  })

  it('should display options when input clicked', async () => {
    renderComponent()

    userEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText(user1)).toBeInTheDocument()
    expect(await screen.findByText(user2)).toBeInTheDocument()
  })

  it('should display selected items', () => {
    renderComponent({ selectedOptions: [user1] })

    expect(screen.getByText(user1)).toBeInTheDocument()
  })

  it('should call handler when option selected', async () => {
    renderComponent()

    userEvent.click(screen.getByRole('combobox'))

    userEvent.click(within(screen.getByRole('listbox')).getByText(user2))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([user2])
    })
  })

  it('should call handler when option deselected', async () => {
    renderComponent({ selectedOptions: [user1] })

    userEvent.click(screen.getByRole('combobox'))

    userEvent.click(within(screen.getByRole('listbox')).getByText(user1))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([])
    })
  })

  it('should call handler when selected option removed', async () => {
    renderComponent({ selectedOptions: [user1] })

    userEvent.click(screen.getByRole('combobox'))

    userEvent.click(
      within(screen.getByRole('combobox')).getByText('Remove option'),
    )

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([])
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
    render(
      <MultiselectCreatable value={[]} options={[]} onChange={onChange}>
        <MultiselectCreatable.Button placeholder="Add people" />
        <MultiselectCreatable.Items>
          <MultiselectCreatable.ItemsEmpty>
            No results
          </MultiselectCreatable.ItemsEmpty>
        </MultiselectCreatable.Items>
      </MultiselectCreatable>,
    )

    userEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText('No results')).toBeInTheDocument()
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

  it('should suggest to create item if no options', async () => {
    renderComponent({ options: [] })

    userEvent.click(screen.getByRole('combobox'))
    userEvent.paste(screen.getByPlaceholderText('Add people'), 'tt')

    expect(await screen.findByText('Create tt')).toBeInTheDocument()
  })

  it('should call onCreateItem', async () => {
    renderComponent({ options: [] })

    userEvent.click(screen.getByRole('combobox'))
    userEvent.paste(screen.getByPlaceholderText('Add people'), 'test')

    userEvent.click(await screen.findByText('Create test'))

    await waitFor(() => {
      expect(onCreateItem).toHaveBeenCalledTimes(1)
    })

    expect(onCreateItem).toHaveBeenCalledWith('test')
  })
})
