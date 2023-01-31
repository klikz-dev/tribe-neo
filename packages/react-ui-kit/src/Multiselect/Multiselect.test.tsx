import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Multiselect } from '.'

describe('Multiselect', () => {
  const user1 = {
    name: 'Wade Cooper',
  }
  const user2 = {
    name: 'Arlene Mccoy',
  }

  const onChange = jest.fn()

  const renderComponent = (props: any = {}) => {
    const { options = [user1, user2], selectedOptions = [], ...rest } = props

    render(
      <Multiselect
        value={selectedOptions}
        options={options}
        onChange={onChange}
        {...rest}
      >
        <Multiselect.Button placeholder="Add people">
          {selectedOptions.map((person, index) => (
            <Multiselect.SelectedItem
              key={person.name}
              value={person}
              index={index}
            >
              {person.name}
            </Multiselect.SelectedItem>
          ))}
        </Multiselect.Button>
        <Multiselect.Items>
          {options.map((person, index) => (
            <Multiselect.Item key={person.name} value={person} index={index}>
              {person.name}
            </Multiselect.Item>
          ))}
        </Multiselect.Items>
      </Multiselect>,
    )
  }

  it('should display button placeholder', () => {
    renderComponent()

    expect(screen.getByPlaceholderText('Add people')).toBeInTheDocument()
  })

  it('should display options when input clicked', async () => {
    renderComponent()

    userEvent.click(screen.getByRole('combobox'))

    expect(await screen.findByText(user1.name)).toBeInTheDocument()
    expect(await screen.findByText(user2.name)).toBeInTheDocument()
  })

  it('should display selected items', () => {
    renderComponent({ selectedOptions: [user1] })

    expect(screen.getByText(user1.name)).toBeInTheDocument()
  })

  it('should call handler when option selected', async () => {
    renderComponent()

    userEvent.click(screen.getByRole('combobox'))

    userEvent.click(within(screen.getByRole('listbox')).getByText(user2.name))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([user2])
    })
  })

  it('should call handler when option deselected', async () => {
    renderComponent({ selectedOptions: [user1] })

    userEvent.click(screen.getByRole('combobox'))

    userEvent.click(within(screen.getByRole('listbox')).getByText(user1.name))

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

  describe('searchable', () => {
    const onInputChange = jest.fn()

    const renderSearchableComponent = (props = {}) => {
      const options = [
        {
          name: 'Tom Cook',
        },
        {
          name: 'Tanya Fox',
        },
      ]
      return renderComponent({
        options,
        searchable: true,
        onInputChange,
      })
    }

    it('should call onInputChange listener when input changes', async () => {
      renderSearchableComponent()

      userEvent.paste(screen.getByPlaceholderText('Add people'), 'new value')

      await waitFor(() => {
        expect(onInputChange).toHaveBeenCalledTimes(1)
      })

      expect(onInputChange).toHaveBeenCalledWith('new value')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should display empty results', async () => {
      render(
        <Multiselect value={[]} options={[]} onChange={onChange}>
          <Multiselect.Button placeholder="Add people" />
          <Multiselect.Items>
            <Multiselect.ItemsEmpty>No results</Multiselect.ItemsEmpty>
          </Multiselect.Items>
        </Multiselect>,
      )

      userEvent.click(screen.getByRole('combobox'))

      expect(await screen.findByText('No results')).toBeInTheDocument()
    })

    it('should keep input value when item selected', async () => {
      renderSearchableComponent()

      userEvent.click(screen.getByRole('combobox'))
      userEvent.paste(screen.getByPlaceholderText('Add people'), 't')
      userEvent.click(await screen.findByText('Tanya Fox'))

      expect(screen.getByDisplayValue('t')).toBeInTheDocument()
    })

    it('should clear input value on input blur', async () => {
      renderSearchableComponent()

      userEvent.click(screen.getByRole('combobox'))
      userEvent.paste(screen.getByPlaceholderText('Add people'), 't')
      expect(screen.getByDisplayValue('t')).toBeInTheDocument()

      userEvent.tab()
      await waitFor(() => {
        expect(screen.queryByDisplayValue('t')).not.toBeInTheDocument()
      })
    })
  })
})
