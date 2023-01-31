import { FC, useMemo, useState } from 'react'

import { Space, QuerySpacesArgs } from '@tribeplatform/gql-client/types'
import { Multiselect } from '@tribeplatform/react-ui-kit/Multiselect'
import { SearchableSelect } from '@tribeplatform/react-ui-kit/SearchableSelect'

import { useSpaces } from '../../hooks'
import { simplifyPaginatedResult } from '../../utils'
import { pickIfExists } from './arrays.utils'
import { SpaceImage } from './SpaceImage'
import { useDebounce } from './useDebounce'

type SpacePickerSingleProps = {
  value?: Space
  onChange: (values: Space) => void
}
type SpacePickerMultipleProps = {
  value?: Space[]
  onChange: (values: Space[]) => void
  multiple?: true
}

export type SpacePickerProps = (
  | SpacePickerSingleProps
  | SpacePickerMultipleProps
) & {
  placeholder?: string
  variables?: Omit<QuerySpacesArgs, 'query'>
}

const isMultiple = (
  props: SpacePickerSingleProps | SpacePickerMultipleProps,
): props is SpacePickerMultipleProps =>
  (props as SpacePickerMultipleProps).multiple === true

export const SpacePicker: FC<SpacePickerProps> = props => {
  const { placeholder, variables } = props

  const [search, setSearch] = useState('')
  const debouncedQuery = useDebounce(search, 300)

  const { data, isLoading } = useSpaces({
    fields: { image: 'basic' },
    variables: {
      query: debouncedQuery,
      limit: 20,
      ...variables,
    },
  })

  const spaces = useMemo(
    () => simplifyPaginatedResult<Space>(data)?.nodes || [],
    [data],
  )

  if (isMultiple(props)) {
    const { value, onChange } = props
    const suggestedSpaces: Space[] = pickIfExists(spaces, value, 'id')

    return (
      <Multiselect
        value={value}
        options={suggestedSpaces}
        onChange={onChange}
        searchable
        onInputChange={setSearch}
      >
        <Multiselect.Button placeholder={placeholder}>
          {value.map((space, index) => (
            <Multiselect.SelectedItem
              key={space.id}
              value={space}
              index={index}
            >
              <div className="flex items-center space-x-2">
                <SpaceImage size="xs" space={space} />
                {space.name}
              </div>
            </Multiselect.SelectedItem>
          ))}
        </Multiselect.Button>
        <Multiselect.Items>
          {suggestedSpaces.map((space, index) => (
            <Multiselect.Item key={space.id} value={space} index={index}>
              <div className="flex items-center space-x-2">
                <SpaceImage size="xs" space={space} />
                {space.name}
              </div>
            </Multiselect.Item>
          ))}
          {isLoading && (
            <Multiselect.ItemsEmpty>Loading...</Multiselect.ItemsEmpty>
          )}
          {!isLoading && search && suggestedSpaces.length === 0 && (
            <Multiselect.ItemsEmpty>No results</Multiselect.ItemsEmpty>
          )}
        </Multiselect.Items>
      </Multiselect>
    )
  }

  const { value, onChange } = props
  const suggestedSpaces: Space[] = value
    ? pickIfExists(spaces, [value], 'id')
    : spaces

  return (
    <SearchableSelect
      value={value}
      options={suggestedSpaces}
      onChange={onChange}
      onInputChange={setSearch}
    >
      <SearchableSelect.Button placeholder={placeholder}>
        {value && (
          <div className="flex items-center space-x-2">
            <SpaceImage size="xs" space={value} />
            {value.name}
          </div>
        )}
      </SearchableSelect.Button>
      <SearchableSelect.Items>
        {suggestedSpaces.map(space => (
          <SearchableSelect.Item key={space.id} value={space.id}>
            <div className="flex items-center space-x-2">
              <SpaceImage size="xs" space={space} />
              {space.name}
            </div>
          </SearchableSelect.Item>
        ))}
        {isLoading && (
          <SearchableSelect.ItemsEmpty>Loading...</SearchableSelect.ItemsEmpty>
        )}
        {!isLoading && search && suggestedSpaces.length === 0 && (
          <SearchableSelect.ItemsEmpty>No results</SearchableSelect.ItemsEmpty>
        )}
      </SearchableSelect.Items>
    </SearchableSelect>
  )
}
