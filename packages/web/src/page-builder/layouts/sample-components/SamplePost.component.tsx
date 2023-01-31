import { Post } from '@tribeplatform/gql-client/types'
import { useFeed } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'

import { ErrorBoundary } from '../../../components/Error/ErrorBoundry'
import { Post as PostComponent } from '../../../components/Post'

export const SamplePost = () => {
  const { data } = useFeed({
    fields: {
      owner: {
        member: { profilePicture: 'basic' },
      },
      postType: 'basic',
      mentions: 'basic',
      space: 'basic',
      authMemberProps: 'all',
      reactions: { fields: 'all', variables: { limit: 25 } },
      replies: {
        fields: {
          authMemberProps: 'all',
          mentions: 'basic',
          owner: {
            member: { profilePicture: 'basic' },
          },
          reactions: { fields: 'basic', variables: { limit: 25 } },
        },
        variables: {
          limit: 1,
          reverse: true,
        },
      },
    },
    variables: { limit: 1, onlyMemberSpaces: true },
    useInfiniteQueryOptions: {
      refetchOnMount: 'always',
    },
  })
  const { nodes: posts } = simplifyPaginatedResult<Post>(data)

  const post = posts?.[0]
  if (!post) {
    return null
  }

  // mutating custom post for better preview
  post.title = 'This is a sample post'
  const titleField = post.mappingFields.find(it => it.key === 'title')
  if (titleField) {
    titleField.value = post.title
  }
  post.shortContent =
    'This is how text will appear in posts made on your community. And links will appear like <a href="#">this</a>.'
  post.hasMoreContent = false
  const reply = post.replies?.nodes?.[0]
  if (reply) {
    reply.shortContent = 'And this is how replies will appear'
    reply.hasMoreContent = false
  }

  return (
    <ErrorBoundary>
      <div className="cursor-default pointer-events-none">
        <PostComponent
          post={post}
          context="network"
          activeTagId=""
          view="card"
        />
      </div>
    </ErrorBoundary>
  )
}
