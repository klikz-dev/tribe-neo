import { useState } from 'react'

import clsx from 'clsx'

import { Avatar } from '../Avatar'
import { Select } from './Select'

export default {
  title: 'Forms/Select',
  component: Select,
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
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Select {...args} value={selectedPerson} onChange={setSelectedPerson}>
      <Select.Button>{selectedPerson.name}</Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item key={person.id} value={person}>
            {person.name}
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}
Template.args = {
  invalid: false,
  disabled: false,
}

export const Disabled = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Select value={selectedPerson} onChange={setSelectedPerson} disabled>
      <Select.Button>{selectedPerson.name}</Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}

export const WithValidationError = (args: any) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Select value={selectedPerson} onChange={setSelectedPerson} invalid>
      <Select.Button>{selectedPerson.name}</Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}

export const DisabledItem = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Select value={selectedPerson} onChange={setSelectedPerson}>
      <Select.Button>{selectedPerson.name}</Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}

export const WithAvatar = (args: any) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Select value={selectedPerson} onChange={setSelectedPerson}>
      <Select.Button>
        <span className="flex items-center">
          <Avatar
            src={selectedPerson.avatar}
            size="xs"
            name={selectedPerson.name}
          />
          <span className="ml-3 block truncate">{selectedPerson.name}</span>
        </span>
      </Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item key={person.id} value={person}>
            <div className="flex items-center">
              <Avatar src={person.avatar} size="xs" name={person.name} />
              <span className="ml-3 block truncate">{person.name}</span>
            </div>
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}

export const WithSecondaryText = (args: any) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Select value={selectedPerson} onChange={setSelectedPerson}>
      <Select.Button>
        <span className="w-full inline-flex truncate">
          <span className="truncate">{selectedPerson.name}</span>
          <span className="ml-2 truncate text-basicSurface-500">
            {selectedPerson.username}
          </span>
        </span>
      </Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item key={person.id} value={person}>
            {({ selected, active }) => (
              <div className="flex">
                <span
                  className={clsx(
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  )}
                >
                  {person.name}
                </span>
                <span
                  className={clsx(
                    active ? 'text-actionPrimary-200' : 'text-basicSurface-500',
                    'ml-2 truncate',
                  )}
                >
                  {person.username}
                </span>
              </div>
            )}
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}

export const Placeholder = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>()

  return (
    <Select value={selectedPerson} onChange={setSelectedPerson}>
      <Select.Button placeholder="Select person">
        {selectedPerson?.name}
      </Select.Button>
      <Select.Items>
        {people.map(person => (
          <Select.Item key={person.id} value={person}>
            {person.name}
          </Select.Item>
        ))}
      </Select.Items>
    </Select>
  )
}
