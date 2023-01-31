import { useCallback, useState } from 'react'

import ChevronDownIcon from '@heroicons/react/solid/ChevronDownIcon'

import {
  Image,
  Media,
  Member,
  SearchEntityType,
  Space,
  SpaceRoleType,
} from '@tribeplatform/gql-client/types'
import {
  useAddSpaceMember,
  useAuthMember,
  useMembers,
  useSearch,
  useSpaceRoles,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { Multiselect } from '@tribeplatform/react-ui-kit/Multiselect'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

// import { useDebounce } from '../../utils/useDebounce'

export interface AddMembersModalProps {
  onClose?: () => void
  space: Space
}

interface SuggestedMember {
  id: string
  name: string
  profilePicture: Media
  tagline?: string
}

export const AddMembersModal = ({ space, onClose }: AddMembersModalProps) => {
  const { isAdmin, isModerator } = useAuthMember()
  const { data: _spaceRoles } = useSpaceRoles({
    variables: {
      spaceId: space.id,
    },
  })

  // TODO: figure out a more sophisticated way to add members with a space role based on the user role
  const spaceRoles = _spaceRoles?.filter(
    sr => !(!isAdmin && !isModerator && sr.type === SpaceRoleType.ADMIN),
  )

  const { mutate: addSpaceMembers } = useAddSpaceMember()

  const [newMembersRole, setNewMembersRole] = useState<SpaceRoleType>(
    SpaceRoleType.MEMBER,
  )

  // @TODO - ask backend for a flag to ignore space members
  const { data: networkMembersData } = useMembers({
    variables: { limit: 10 },
    fields: { profilePicture: 'basic' },
  })
  const { nodes: networkMembersSimplifiedData } =
    simplifyPaginatedResult<Member>(networkMembersData)
  const networkMembers: SuggestedMember[] = networkMembersSimplifiedData.map(
    it => ({
      id: it?.id,
      name: it?.name,
      profilePicture: it?.profilePicture,
      tagline: it?.tagline,
    }),
  )

  const [search, setSearch] = useState('')
  // const debouncedQuery = useDebounce(search, 300)
  const { data, isFetching: searchLoading } = useSearch({
    variables: {
      input: {
        query: `${search} +for:member`,
      },
    },
    fields: {
      media: 'basic',
    },
    useQueryOptions: {
      keepPreviousData: true,
    },
  })

  const membersSearchResults: SuggestedMember[] =
    data?.hits
      .find(hit => hit.entityType === SearchEntityType.MEMBER)
      ?.hits?.map(hit => ({
        id: hit?.entityId,
        name: hit?.title,
        profilePicture: hit?.media,
        tagline: hit?.content,
      })) || []

  const members: SuggestedMember[] = search
    ? membersSearchResults
    : networkMembers

  const [selectedMembers, setSelectedMembers] = useState<SuggestedMember[]>([])

  // Remove already selected members from suggested members
  const suggestedMembers: SuggestedMember[] =
    members?.filter(({ id }) => !selectedMembers.some(sm => sm.id === id)) || []

  const close = useCallback(() => {
    setSearch('')
    setSelectedMembers([])
    onClose?.()
  }, [onClose])

  const addNewMembers = useCallback(async () => {
    const role = spaceRoles?.find(
      sr => sr.name.toLowerCase() === newMembersRole,
    )

    if (!selectedMembers.length || !role) return

    addSpaceMembers(
      {
        spaceId: space.id,
        input: selectedMembers.map(({ id: memberId }) => ({
          memberId,
          roleId: role.id,
        })),
      },
      {
        onSuccess: () => {
          toast({
            title: 'New members added',
            status: 'success',
          })
          close()
        },
        onError: () => {
          toast({
            title: "Couldn't add members",
            status: 'error',
          })
        },
      },
    )
  }, [
    spaceRoles,
    selectedMembers,
    newMembersRole,
    addSpaceMembers,
    space?.id,
    close,
  ])

  return (
    <>
      <Modal.Content>
        <Multiselect
          value={selectedMembers}
          options={suggestedMembers}
          onChange={setSelectedMembers}
          searchable
          onInputChange={setSearch}
        >
          <Multiselect.Button placeholder="Search by name">
            {selectedMembers.map((person, index) => (
              <Multiselect.SelectedItem
                key={person.id}
                value={person}
                index={index}
              >
                <span className="flex items-center">
                  <Avatar
                    src={(person?.profilePicture as Image)?.urls?.thumb}
                    size="xs"
                    name={person.name}
                  />
                  <span className="ml-3 block truncate">{person.name}</span>
                </span>
              </Multiselect.SelectedItem>
            ))}
          </Multiselect.Button>
          <div className="h-96 py-6">
            {!search ? (
              <div className="pb-2 text-basicSurface-300">Suggested</div>
            ) : null}
            <div className="-mx-2 space-y-4 h-full overflow-y-auto">
              <Multiselect.Items variant="unstyled">
                {searchLoading && (
                  <Multiselect.ItemsEmpty>Loading...</Multiselect.ItemsEmpty>
                )}
                {!searchLoading &&
                  suggestedMembers.map((person, index) => (
                    <Multiselect.Item
                      key={person.id}
                      value={person}
                      index={index}
                    >
                      <span className="flex items-center">
                        <Avatar
                          src={(person?.profilePicture as Image)?.urls?.thumb}
                          name={person.name}
                        />
                        <span className="ml-3 block truncate">
                          {person.name}
                        </span>
                      </span>
                    </Multiselect.Item>
                  ))}
                {!searchLoading && membersSearchResults.length === 0 && (
                  <Multiselect.ItemsEmpty>
                    {search ? (
                      <div>Cannot find members for this query.</div>
                    ) : (
                      <div>No suggestions at this time.</div>
                    )}
                  </Multiselect.ItemsEmpty>
                )}
              </Multiselect.Items>
            </div>
          </div>
        </Multiselect>
      </Modal.Content>
      <Modal.Footer withBorder>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-basicSurface-300">Add as</span>{' '}
            <Dropdown>
              <Dropdown.ButtonMinimal>
                <span className="text-actionAccent-500 hover:text-actionAccentHover-500 flex space-x-1 items-center">
                  {newMembersRole === SpaceRoleType.MEMBER
                    ? 'members'
                    : 'admins'}

                  <ChevronDownIcon className="w-4 h-4" />
                </span>
              </Dropdown.ButtonMinimal>
              <Dropdown.Items>
                {spaceRoles?.map(({ id, name }) => (
                  <Dropdown.Item
                    key={id}
                    onClick={() => {
                      setNewMembersRole(name.toLowerCase() as SpaceRoleType)
                    }}
                  >{`${name.toLowerCase()}s`}</Dropdown.Item>
                ))}
              </Dropdown.Items>
            </Dropdown>
          </div>
          <Button
            variant="primary"
            data-testid="add-button"
            onClick={addNewMembers}
            disabled={selectedMembers.length === 0}
          >
            Add
          </Button>
        </div>
      </Modal.Footer>
    </>
  )
}
