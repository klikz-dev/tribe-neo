import { FC, useMemo, useState } from 'react'

import {
  Image,
  Member,
  QueryMembersArgs,
} from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Multiselect } from '@tribeplatform/react-ui-kit/Multiselect'
import { SearchableSelect } from '@tribeplatform/react-ui-kit/SearchableSelect'

import { useMembers } from '../../hooks'
import { simplifyPaginatedResult } from '../../utils'
import { pickIfExists } from './arrays.utils'
import { useDebounce } from './useDebounce'

type MemberPickerSingleProps = {
  value?: Member
  onChange: (values: Member) => void
}
type MemberPickerMultipleProps = {
  value?: Member[]
  onChange: (values: Member[]) => void
  multiple?: true
}

export type MemberPickerProps = (
  | MemberPickerSingleProps
  | MemberPickerMultipleProps
) & {
  placeholder?: string
  variables?: Omit<QueryMembersArgs, 'query'>
}

const isMultiple = (
  props: MemberPickerSingleProps | MemberPickerMultipleProps,
): props is MemberPickerMultipleProps =>
  (props as MemberPickerMultipleProps).multiple === true

export const MemberPicker: FC<MemberPickerProps> = props => {
  const { placeholder, variables } = props

  const [search, setSearch] = useState('')
  const debouncedQuery = useDebounce(search, 300)

  const { data, isLoading } = useMembers({
    fields: { profilePicture: 'basic' },
    variables: {
      query: debouncedQuery,
      limit: 20,
      ...variables,
    },
  })

  const members = useMemo(
    () => simplifyPaginatedResult<Member>(data)?.nodes || [],
    [data],
  )

  if (isMultiple(props)) {
    const { value, onChange } = props
    const suggestedMembers: Member[] = pickIfExists(members, value, 'id')

    return (
      <Multiselect
        value={value}
        options={suggestedMembers}
        onChange={onChange}
        searchable
        onInputChange={setSearch}
      >
        <Multiselect.Button placeholder={placeholder}>
          {value.map((member, index) => (
            <Multiselect.SelectedItem
              key={member.id}
              value={member}
              index={index}
            >
              <div className="flex items-center space-x-2">
                <Avatar
                  size="xs"
                  src={(member?.profilePicture as Image)?.urls?.thumb}
                  name={member?.name}
                />
                {member.name}
              </div>
            </Multiselect.SelectedItem>
          ))}
        </Multiselect.Button>
        <Multiselect.Items>
          {suggestedMembers.map((member, index) => (
            <Multiselect.Item key={member.id} value={member} index={index}>
              <div className="flex items-center space-x-2">
                <Avatar
                  size="xs"
                  src={(member?.profilePicture as Image)?.urls?.thumb}
                  name={member?.name}
                />
                {member.name}
              </div>
            </Multiselect.Item>
          ))}
          {isLoading && (
            <Multiselect.ItemsEmpty>Loading...</Multiselect.ItemsEmpty>
          )}
          {!isLoading && search && suggestedMembers.length === 0 && (
            <Multiselect.ItemsEmpty>No results</Multiselect.ItemsEmpty>
          )}
        </Multiselect.Items>
      </Multiselect>
    )
  }

  const { value, onChange } = props
  const suggestedMembers: Member[] = value
    ? pickIfExists(members, [value], 'id')
    : members

  return (
    <SearchableSelect
      value={value}
      options={suggestedMembers}
      onChange={onChange}
      onInputChange={setSearch}
    >
      <SearchableSelect.Button placeholder={placeholder}>
        {value && (
          <div className="flex items-center space-x-2">
            <Avatar
              size="xs"
              src={(value?.profilePicture as Image)?.urls?.thumb}
              name={value?.name}
            />
            {value.name}
          </div>
        )}
      </SearchableSelect.Button>
      <SearchableSelect.Items>
        {suggestedMembers.map(member => (
          <SearchableSelect.Item key={member.id} value={member.id}>
            <div className="flex items-center space-x-2">
              <Avatar
                size="xs"
                src={(member?.profilePicture as Image)?.urls?.thumb}
                name={member?.name}
              />
              {member.name}
            </div>
          </SearchableSelect.Item>
        ))}
        {isLoading && (
          <SearchableSelect.ItemsEmpty>Loading...</SearchableSelect.ItemsEmpty>
        )}
        {!isLoading && search && suggestedMembers.length === 0 && (
          <SearchableSelect.ItemsEmpty>No results</SearchableSelect.ItemsEmpty>
        )}
      </SearchableSelect.Items>
    </SearchableSelect>
  )
}
