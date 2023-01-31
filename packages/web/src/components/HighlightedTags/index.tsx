import { useCallback, useEffect, useState } from 'react'

import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import {
  HighlightedTag,
  HighlightedTagType,
} from '@tribeplatform/gql-client/types'
import {
  useAuthMember,
  useUpdateSpaceHighlightedTags,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import {
  generateSpacePostsUrl,
  generateSpacePostsUrlFilteredByTag,
} from '../../utils/links'
import { SelectableTag, SpaceTagsSelector } from '../Space/SpaceTagsSelector'
import { TagPillWithLink } from '../TagPill'

type HighlightedTagsProps = {
  space: {
    id: string
    slug: string
    highlightedTags?: null | HighlightedTag[]
  }
  activeTagId?: string
}

export const HighlightedTags = ({
  space,
  activeTagId,
}: HighlightedTagsProps) => {
  const { id: spaceId, slug: spaceSlug, highlightedTags } = space

  const [canGetPosts] = hasScopesPermission(space, ['getPosts'])

  const [currentTags, setCurrentTags] = useState<SelectableTag[]>(
    mapToSelectableTag(highlightedTags),
  )
  const [isEditing, setIsEditing] = useState(false)
  // Reset tags on spaceId/url change
  useEffect(() => {
    setCurrentTags(mapToSelectableTag(highlightedTags))
    setIsEditing(false)
  }, [highlightedTags])

  const { isAdmin } = useAuthMember()
  const { mutate: updateTags, isLoading: isUpdatingTags } =
    useUpdateSpaceHighlightedTags(spaceSlug, {
      useMutationOptions: {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    })

  const handleUpdateTags = useCallback(
    (tags: SelectableTag[]) => {
      updateTags({
        spaceId,
        input: {
          highlightedTags: tags.map(tag => ({
            tagId: tag?.id,
            text: tag?.title,
            type: HighlightedTagType.TOPIC,
          })),
        },
      })
    },
    [spaceId],
  )

  if (!canGetPosts || highlightedTags === undefined) {
    /**
     * When highlightedTags is undefined, the space is not loaded yet.
     * When highlightedTags is null, the space is loaded but has no highlighted tags
     * When canGetPosts is false, member does not have access to get posts and tags in the space
     */
    return null
  }

  if ((highlightedTags === null || currentTags.length === 0) && !isAdmin) {
    return null
  }

  return (
    <Card>
      <Card.Header
        title="Highlighted Tags"
        action={
          activeTagId ? (
            <Link
              as={RouterLink}
              variant="primary"
              to={generateSpacePostsUrl(spaceSlug)}
            >
              Clear
            </Link>
          ) : null
        }
        withBorder
      />

      {isEditing || currentTags.length > 0 ? (
        <Card.Content className={clsx(!isEditing && '-m-1')}>
          {isEditing ? (
            <SpaceTagsSelector
              spaceId={spaceId}
              tags={currentTags}
              setTags={setCurrentTags}
              createable={false}
            />
          ) : (
            currentTags.map(({ id, title }) => (
              <TagPillWithLink
                className="inline-flex m-1"
                key={id}
                active={id === activeTagId}
                link={
                  id === activeTagId
                    ? generateSpacePostsUrl(spaceSlug)
                    : generateSpacePostsUrlFilteredByTag(spaceSlug, id)
                }
                title={title}
              />
            ))
          )}
        </Card.Content>
      ) : (
        <div className="py-3" />
      )}
      {isAdmin && (
        <Card.Footer className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                disabled={isUpdatingTags}
                onClick={() => {
                  setIsEditing(false)
                  setCurrentTags(mapToSelectableTag(highlightedTags))
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                loading={isUpdatingTags}
                onClick={() => {
                  handleUpdateTags(currentTags)
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="outline"
              onClick={() => {
                setIsEditing(true)
              }}
            >
              Edit Highlighted Tags
            </Button>
          )}
        </Card.Footer>
      )}
    </Card>
  )
}

const mapToSelectableTag = (
  highlightedTags?: HighlightedTag[],
): SelectableTag[] => {
  return (
    highlightedTags
      ?.map(({ tag }) => ({
        title: tag?.title,
        id: tag?.id,
      }))
      ?.filter(tag => tag?.id && tag?.title) || []
  )
}
