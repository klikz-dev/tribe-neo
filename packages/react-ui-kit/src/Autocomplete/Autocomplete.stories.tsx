import { useEffect, useState } from 'react'

import MailIcon from '@heroicons/react/solid/MailIcon'
import PhoneIcon from '@heroicons/react/solid/PhoneIcon'
import { action } from '@storybook/addon-actions'
import clsx from 'clsx'

import { Icon } from '../Icon'
import { StackedList } from '../StackedList'
import { Autocomplete } from './Autocomplete'

export default {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
}

export const Template = (args: any) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) {
      setLoading(true)
      setData([])
    }
    const timer = setTimeout(() => {
      if (search) {
        setData([
          {
            title: `${search} result1`,
            content: `${search} content1`,
            icon: <MailIcon />,
          },
          {
            title: `${search} result2`,
            content: `${search} content2`,
            icon: <PhoneIcon />,
          },
          {
            title: `${search} result3`,
            content: `${search} content3`,
            icon: <MailIcon />,
          },
          {
            title: `${search} result4`,
            content: `${search} content4`,
            icon: <PhoneIcon />,
          },
        ])
      } else {
        setData([])
      }
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search])

  const onInputChange = inputValue => {
    setSearch(inputValue)
  }

  return (
    <Autocomplete
      {...args}
      itemToString={({ title }) => title || ''}
      value={search}
      onChange={action('onChange')}
      options={data}
      onInputChange={onInputChange}
      loading={loading}
    >
      <Autocomplete.Input
        placeholder="Async search..."
        onEnter={action('onEnter')}
      />
      <Autocomplete.Items>
        {data.map(({ icon, title, content }, index) => (
          <Autocomplete.Item key={title} value={title} index={index}>
            <div className="py-2 flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5">{icon}</Icon>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{title}</p>
                <p className={clsx('text-sm truncate')}>{content}</p>
              </div>
            </div>
          </Autocomplete.Item>
        ))}
        {loading && (
          <Autocomplete.ItemsEmpty>Loading...</Autocomplete.ItemsEmpty>
        )}
        {!loading && search && data.length === 0 && (
          <Autocomplete.ItemsEmpty>No results</Autocomplete.ItemsEmpty>
        )}
      </Autocomplete.Items>
    </Autocomplete>
  )
}
Template.args = {
  disabled: false,
}

export const StackedListGroups = args => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const { onChange = action('onChange'), ...restArgs } = args

  useEffect(() => {
    if (search) {
      setLoading(true)
      setData([])
    }
    const timer = setTimeout(() => {
      if (search) {
        setData([
          {
            title: 'A',
            hits: Array.from({ length: 10 }, (x, i) => ({
              title: `${search} A${i} result`,
            })),
          },
          {
            title: 'B',
            hits: Array.from({ length: 10 }, (x, i) => ({
              title: `${search} B${i} result`,
            })),
          },
        ])
      } else {
        setData([])
      }
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search])

  const onInputChange = inputValue => {
    setSearch(inputValue)
  }

  return (
    <Autocomplete
      {...restArgs}
      itemToString={({ name }) => name || ''}
      value={search}
      onChange={onChange}
      options={data?.flatMap(category => category.hits) || []}
      onInputChange={onInputChange}
      loading={loading}
    >
      <Autocomplete.Input placeholder="Async search.." />
      <Autocomplete.Items className="h-full overflow-y-auto isolate">
        {
          data.reduce(
            (result, section, sectionIndex) => {
              result.sections.push(
                // eslint-disable-next-line react/no-array-index-key
                <StackedList.Group key={sectionIndex}>
                  <StackedList.GroupTitle>
                    {section.title}
                  </StackedList.GroupTitle>
                  {section.hits.map((person, personIndex) => {
                    const index = result.itemIndex
                    result.itemIndex += 1
                    return (
                      <Autocomplete.Item
                        // eslint-disable-next-line react/no-array-index-key
                        key={personIndex}
                        value={person}
                        index={index}
                      >
                        {person.title}
                      </Autocomplete.Item>
                    )
                  })}
                </StackedList.Group>,
              )

              return result
            },
            { sections: [], itemIndex: 0 },
          ).sections
        }
        {loading && (
          <Autocomplete.ItemsEmpty>Loading...</Autocomplete.ItemsEmpty>
        )}
        {!loading && search && data.length === 0 && (
          <Autocomplete.ItemsEmpty>No results</Autocomplete.ItemsEmpty>
        )}
      </Autocomplete.Items>
    </Autocomplete>
  )
}
