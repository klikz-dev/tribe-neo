import { memo, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { Post } from '@tribeplatform/gql-client/types'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { createPostAddress, getPostFieldValue } from '../../utils/post'
import { Attachments } from '../Composer/components/Attachment/Attachments'
import { HtmlContent } from '../HtmlContent'
import { PostContext } from './@types'

export const PostContent = memo(
  ({
    post,
    collapsible = true,
    context,
  }: {
    post: Post
    collapsible?: boolean
    context: PostContext
  }) => {
    const [showMore, setShowMore] = useState(false)
    const { id, slug, hasMoreContent } = post

    const postLink = createPostAddress(post?.space?.slug, post.id, slug)
    const title =
      getPostFieldValue(post, 'title') || getPostFieldValue(post, 'question')

    const rootPost = post?.repliedTos?.[post?.repliedTos.length - 1]

    const rootPostLink = createPostAddress(
      post?.space?.slug,
      rootPost?.id,
      rootPost?.slug,
    )
    const rootPostTitle =
      getPostFieldValue(rootPost, 'title') ||
      getPostFieldValue(rootPost, 'question')

    const { shortContent } = post || {}
    let content =
      getPostFieldValue(post, 'content') ||
      getPostFieldValue(post, 'description') ||
      getPostFieldValue(post, 'answer')

    if (collapsible && showMore === false) {
      content = shortContent
    }
    // this is impossible right now but in future when we are only loading the shortContent it will be useful
    if (!content && !!shortContent) {
      content = shortContent
    }

    return (
      <div className="max-w-full break-words mb-2">
        {context === 'moderation' && rootPostTitle && (
          <h2>
            <RouterLink
              to={rootPostLink}
              id={`question-title-${rootPost?.id}`}
              className="text-basicSurface-900 block text-2xl mb-4"
            >
              {`Replied to: ${rootPostTitle}`}
            </RouterLink>
          </h2>
        )}
        {title && (
          <h2>
            <RouterLink
              to={postLink}
              id={`question-title-${id}`}
              className="text-basicSurface-900 block text-2xl mb-4"
            >
              {title}
            </RouterLink>
          </h2>
        )}
        <article className="mt-2 text-md text-basicSurface-700">
          <HtmlContent
            value={content}
            embeds={post?.embeds}
            mentions={post?.mentions}
          />
        </article>
        {collapsible && hasMoreContent && (
          <Link
            to="#"
            as={RouterLink}
            onClick={e => {
              e.preventDefault()
              setShowMore(!showMore)
            }}
            className="inline-block"
          >
            {showMore ? 'See less' : 'See more'}
          </Link>
        )}
        {!!post?.attachments?.length && (
          <div className="mb-2 overflow-y-auto">
            <Attachments isReadOnly attachments={post?.attachments} />
          </div>
        )}
      </div>
    )
  },
)
