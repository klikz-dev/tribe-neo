import { useEffect, useState } from 'react'

import { Avatar } from '../Avatar'
import { Multiselect } from './Multiselect'
import { MultiselectCreatable } from './MultiselectCreatable'

export default {
  title: 'Forms/Multiselect',
  component: Multiselect,
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
  const [selectedPeople, setSelectedPeople] = useState([])

  return (
    <Multiselect
      {...args}
      value={selectedPeople}
      options={people}
      onChange={setSelectedPeople}
    >
      <Multiselect.Button placeholder="Add people">
        {selectedPeople.map((person, index) => (
          <Multiselect.SelectedItem
            key={person.id}
            value={person}
            index={index}
          >
            {person.name}
          </Multiselect.SelectedItem>
        ))}
      </Multiselect.Button>
      <Multiselect.Items>
        {people.map((person, index) => (
          <Multiselect.Item key={person.id} value={person} index={index}>
            {person.name}
          </Multiselect.Item>
        ))}
      </Multiselect.Items>
    </Multiselect>
  )
}

export const DisabledMultiselect = () => {
  const [selectedPeople, setSelectedPeople] = useState([])

  return (
    <Multiselect
      value={selectedPeople}
      options={people}
      onChange={setSelectedPeople}
      disabled
    >
      <Multiselect.Button placeholder="Add people">
        {selectedPeople.map((person, index) => (
          <Multiselect.SelectedItem
            key={person.id}
            value={person}
            index={index}
          >
            {person.name}
          </Multiselect.SelectedItem>
        ))}
      </Multiselect.Button>
      <Multiselect.Items>
        {people.map((person, index) => (
          <Multiselect.Item key={person.id} value={person} index={index}>
            {person.name}
          </Multiselect.Item>
        ))}
      </Multiselect.Items>
    </Multiselect>
  )
}

export const DisabledItem = () => {
  const [selectedPeople, setSelectedPeople] = useState([])

  return (
    <Multiselect
      value={selectedPeople}
      options={people}
      onChange={setSelectedPeople}
    >
      <Multiselect.Button placeholder="Add people">
        {selectedPeople.map((person, index) => (
          <Multiselect.SelectedItem
            key={person.id}
            value={person}
            index={index}
          >
            {person.name}
          </Multiselect.SelectedItem>
        ))}
      </Multiselect.Button>
      <Multiselect.Items>
        {people.map((person, index) => (
          <Multiselect.Item
            key={person.id}
            value={person}
            index={index}
            disabled={person.unavailable}
          >
            {person.name}
          </Multiselect.Item>
        ))}
      </Multiselect.Items>
    </Multiselect>
  )
}

export const WithAvatar = (args: any) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])

  return (
    <Multiselect
      value={selectedPeople}
      onChange={setSelectedPeople}
      options={people}
    >
      <Multiselect.Button placeholder="Add people">
        {selectedPeople.map((person, index) => (
          <Multiselect.SelectedItem
            key={person.id}
            value={person}
            index={index}
          >
            <span className="flex items-center">
              <Avatar src={person.avatar} size="xs" name={person.name} />
              <span className="ml-3 block truncate">{person.name}</span>
            </span>
          </Multiselect.SelectedItem>
        ))}
      </Multiselect.Button>
      <Multiselect.Items>
        {people.map((person, index) => (
          <Multiselect.Item key={person.id} value={person} index={index}>
            <div className="flex items-center">
              <Avatar src={person.avatar} size="xs" name={person.name} />
              <span className="ml-3 block truncate">{person.name}</span>
            </div>
          </Multiselect.Item>
        ))}
      </Multiselect.Items>
    </Multiselect>
  )
}

export const Search = (args: any) => {
  const [selectedPeople, setSelectedPeople] = useState([])
  const [options, setOptions] = useState(people)

  const onInputChange = inputValue => {
    setOptions(
      people.filter(item =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <Multiselect
      value={selectedPeople}
      options={options}
      onChange={setSelectedPeople}
      searchable
      onInputChange={onInputChange}
    >
      <Multiselect.Button placeholder="Add people">
        {selectedPeople.map((person, index) => (
          <Multiselect.SelectedItem
            key={person.id}
            value={person}
            index={index}
          >
            {person.name}
          </Multiselect.SelectedItem>
        ))}
      </Multiselect.Button>
      <Multiselect.Items>
        {options.map((person, index) => (
          <Multiselect.Item key={person.id} value={person} index={index}>
            {person.name}
          </Multiselect.Item>
        ))}
        {options.length === 0 && (
          <Multiselect.ItemsEmpty>No results</Multiselect.ItemsEmpty>
        )}
      </Multiselect.Items>
    </Multiselect>
  )
}
export const SearchAsync = (args: any) => {
  const [selectedPeople, setSelectedPeople] = useState([])
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

  const onChange = value => {
    setSelectedPeople(value)
    setData(people)
  }

  return (
    <Multiselect
      value={selectedPeople}
      options={data}
      onChange={onChange}
      searchable
      onInputChange={setSearch}
    >
      <Multiselect.Button placeholder="Search people">
        {selectedPeople.map((person, index) => (
          <Multiselect.SelectedItem
            key={person.id}
            value={person}
            index={index}
          >
            {person.name}
          </Multiselect.SelectedItem>
        ))}
      </Multiselect.Button>
      <Multiselect.Items>
        {data.map((person, index) => (
          <Multiselect.Item key={person.id} value={person} index={index}>
            {person.name}
          </Multiselect.Item>
        ))}
        {loading && <Multiselect.ItemsEmpty>Loading...</Multiselect.ItemsEmpty>}
        {!loading && search && data.length === 0 && (
          <Multiselect.ItemsEmpty>No results</Multiselect.ItemsEmpty>
        )}
      </Multiselect.Items>
    </Multiselect>
  )
}

const peopleNames = people.map(it => it.name)

export const WithCreateItem = (args: any) => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])
  const [options, setOptions] = useState(peopleNames)

  return (
    <MultiselectCreatable
      {...args}
      value={selectedPeople}
      options={options}
      onChange={setSelectedPeople}
      searchable
      onInputChange={inputValue => {
        setOptions(
          peopleNames.filter(item =>
            item.toLowerCase().startsWith(inputValue.toLowerCase()),
          ),
        )
      }}
      onCreateItem={inputValue => {
        setOptions([...peopleNames, inputValue])
        setSelectedPeople([...selectedPeople, inputValue])
      }}
    >
      <MultiselectCreatable.Button placeholder="Add people">
        {selectedPeople.map((person, index) => (
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
              {options.map((name, index) => (
                <MultiselectCreatable.Item
                  key={name}
                  value={name}
                  index={index}
                >
                  {name}
                </MultiselectCreatable.Item>
              ))}
              {creating && inputValue?.length > 0 && (
                <MultiselectCreatable.Item
                  value={inputValue}
                  index={options.length}
                >
                  <span>Create</span>{' '}
                  <span className="font-bold">{inputValue}</span>
                </MultiselectCreatable.Item>
              )}
            </>
          )
        }}
      </MultiselectCreatable.Items>
    </MultiselectCreatable>
  )
}
