import { useEffect, useState } from 'react'

import { Avatar } from '../Avatar'
import { SearchableSelect } from './SearchableSelect'

export default {
  title: 'Forms/SearchableSelect',
  component: SearchableSelect,
}

type Person = {
  id: number
  name: string
  username: string
  avatar: string
  unavailable?: boolean
}
const people: Person[] = [
  {
    id: 1,
    name: 'Wade Cooper',
    username: '@wadecooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    username: '@arlenemccoy',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Devon Webb',
    username: '@devonwebb',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Tom Cook',
    username: '@tomcook',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    unavailable: true,
  },
  {
    id: 5,
    name: 'Tanya Fox',
    username: '@tanyafox',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    unavailable: true,
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    username: '@hellenschmidt',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    username: '@carolineschultz',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Mason Heaney',
    username: '@masonheaney',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    username: '@claudiesmitham',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    username: '@emilschaefer',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export const Template = (args: any) => {
  const [selectedPerson, setSelectedPerson] = useState<Person>()
  const [options, setOptions] = useState(people)

  const onInputChange = inputValue => {
    setOptions(
      people.filter(item =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <SearchableSelect
      {...args}
      value={selectedPerson}
      options={options}
      onChange={setSelectedPerson}
      onInputChange={onInputChange}
    >
      <SearchableSelect.Button placeholder="Select person">
        {selectedPerson?.name}
      </SearchableSelect.Button>
      <SearchableSelect.Items>
        {options.map(person => (
          <SearchableSelect.Item key={person.id} value={person}>
            {person.name}
          </SearchableSelect.Item>
        ))}
        {options.length === 0 && (
          <SearchableSelect.ItemsEmpty>No results</SearchableSelect.ItemsEmpty>
        )}
      </SearchableSelect.Items>
    </SearchableSelect>
  )
}
Template.args = {
  disabled: false,
}

export const DisabledSelect = () => {
  return <Template disabled />
}

export const DisabledItem = args => {
  const [selectedPerson, setSelectedPerson] = useState<Person>()
  const [options, setOptions] = useState(people)

  const onInputChange = inputValue => {
    setOptions(
      people.filter(item =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <SearchableSelect
      {...args}
      value={selectedPerson}
      onChange={setSelectedPerson}
      options={options}
      onInputChange={onInputChange}
    >
      <SearchableSelect.Button placeholder="Select person">
        {selectedPerson?.name}
      </SearchableSelect.Button>
      <SearchableSelect.Items>
        {options.map(person => (
          <SearchableSelect.Item
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </SearchableSelect.Item>
        ))}
        {options.length === 0 && (
          <SearchableSelect.ItemsEmpty>No results</SearchableSelect.ItemsEmpty>
        )}
      </SearchableSelect.Items>
    </SearchableSelect>
  )
}

export const WithAvatar = (args: any) => {
  const [selectedPerson, setSelectedPerson] = useState<Person>()
  const [options, setOptions] = useState(people)

  const onInputChange = inputValue => {
    setOptions(
      people.filter(item =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <SearchableSelect
      value={selectedPerson}
      onChange={setSelectedPerson}
      options={options}
      onInputChange={onInputChange}
    >
      <SearchableSelect.Button placeholder="Select person">
        {selectedPerson && (
          <div className="flex items-center">
            <Avatar
              src={selectedPerson.avatar}
              size="xs"
              name={selectedPerson.name}
            />
            <span className="ml-3 block truncate">{selectedPerson.name}</span>
          </div>
        )}
      </SearchableSelect.Button>
      <SearchableSelect.Items>
        {options.map((person, index) => (
          <SearchableSelect.Item key={person.id} value={person} index={index}>
            <div className="flex items-center">
              <Avatar src={person.avatar} size="xs" name={person.name} />
              <span className="ml-3 block truncate">{person.name}</span>
            </div>
          </SearchableSelect.Item>
        ))}
      </SearchableSelect.Items>
    </SearchableSelect>
  )
}

export const SearchAsync = (args: any) => {
  const [selectedPerson, setSelectedPerson] = useState<Person>()
  const [data, setData] = useState(people)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) {
      setLoading(true)
      setData([])
    }
    const timer = setTimeout(() => {
      if (search) {
        setData(
          people.filter(item =>
            item.name.toLowerCase().startsWith(search.toLowerCase()),
          ),
        )
      } else {
        setData(people)
      }
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <SearchableSelect
      value={selectedPerson}
      options={data}
      onChange={setSelectedPerson}
      onInputChange={setSearch}
    >
      <SearchableSelect.Button placeholder="Select person">
        {selectedPerson?.name}
      </SearchableSelect.Button>
      <SearchableSelect.Items>
        {data.map((person, index) => (
          <SearchableSelect.Item key={person.id} value={person} index={index}>
            {person.name}
          </SearchableSelect.Item>
        ))}
        {loading && (
          <SearchableSelect.ItemsEmpty>Loading...</SearchableSelect.ItemsEmpty>
        )}
        {!loading && search && data.length === 0 && (
          <SearchableSelect.ItemsEmpty>No results</SearchableSelect.ItemsEmpty>
        )}
      </SearchableSelect.Items>
    </SearchableSelect>
  )
}
