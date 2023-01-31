import { useMemo, useState } from 'react'

import TagIcon from '@heroicons/react/outline/TagIcon'
import debounce from 'lodash/debounce'

import { Tag } from '@tribeplatform/gql-client/types'
import { useSpaceTags } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { MultiselectCreatable } from '@tribeplatform/react-ui-kit/Multiselect'

export type SelectableTag = {
  id: string
  title: string
}

export type SpaceTagsSelectorProps = {
  spaceId: string
  tags: SelectableTag[]
  setTags: (newTags: SelectableTag[]) => void
  createable?: boolean
  className?: string
}

const tagTitleIdMap: Record<string, string> = {}

export const SpaceTagsSelector = ({
  spaceId,
  tags,
  setTags,
  createable = true,
  className = '',
}: SpaceTagsSelectorProps) => {
  const [query, setQuery] = useState('')
  const { data, isFetching } = useSpaceTags({
    variables: {
      spaceId,
      limit: 10,
      query,
    },
  })

  const { nodes: spaceTags } = simplifyPaginatedResult<Tag>(data)
  const options = useMemo(() => spaceTags?.map(t => t.title) || [], [spaceTags])
  const value = useMemo(() => tags.map(tag => tag?.title), [tags])
  useMemo(() => {
    tags.forEach(t => {
      tagTitleIdMap[t.title] = t.id
    })
    spaceTags?.forEach(t => {
      tagTitleIdMap[t.title] = t.id
    })
  }, [tags, spaceTags])

  const onChange = newTags => {
    setTags(
      newTags.map(title => ({
        title,
        id: tagTitleIdMap[title],
      })),
    )
  }
  const onCreateItem = inputValue => {
    if (createable) {
      setTags([
        ...tags,
        {
          title: inputValue,
          id: `local-${Math.random().toString(36).substr(2, 5)}`,
        },
      ])
    }
  }
  const onInputChange = debounce(inputValue => {
    setQuery(inputValue)
  }, 500)

  return (
    <MultiselectCreatable
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      searchable
      onInputChange={onInputChange}
      onCreateItem={onCreateItem}
      createItemPosition="first"
    >
      <MultiselectCreatable.Button
        placeholder="Add tags..."
        dense
        leadingIcon={
          isFetching ? (
            <SpinnerIcon className="self-center h-5 w-5 animate-spin" />
          ) : (
            <TagIcon className="h-5 w-5" />
          )
        }
      >
        {tags.map(({ title, id }, index: number) => (
          <MultiselectCreatable.SelectedItem
            key={id}
            value={title}
            index={index}
          >
            <span>{title}</span>
          </MultiselectCreatable.SelectedItem>
        ))}
      </MultiselectCreatable.Button>
      <MultiselectCreatable.Items>
        {({ creating, inputValue }) => {
          return (
            <>
              {createable && creating && query?.length > 0 && !isFetching && (
                <MultiselectCreatable.Item value={query} index={0}>
                  <span>Create</span> <span className="font-bold">{query}</span>
                </MultiselectCreatable.Item>
              )}
              {options.length > 0 &&
                options.map((tag, index) => (
                  <MultiselectCreatable.Item
                    key={tag}
                    value={tag}
                    index={index + (creating ? 1 : 0)}
                  >
                    <span>{tag}</span>
                  </MultiselectCreatable.Item>
                ))}
              {isFetching ? (
                <MultiselectCreatable.Item
                  disabled
                  key=":_search"
                  value=":_search"
                  index={creating ? 1 : 0}
                >
                  <span>{`Searching for "${inputValue}"...`}</span>
                </MultiselectCreatable.Item>
              ) : (
                options.length === 0 && (
                  <MultiselectCreatable.Item
                    disabled
                    key=":_none"
                    value=":_none"
                    index={creating ? 1 : 0}
                  >
                    <span>{`No matching results for "${inputValue}"`}</span>
                  </MultiselectCreatable.Item>
                )
              )}
            </>
          )
        }}
      </MultiselectCreatable.Items>
    </MultiselectCreatable>
  )
}
