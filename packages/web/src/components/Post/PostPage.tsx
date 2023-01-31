import { useEffect } from 'react'

import Helmet from 'react-helmet'

import { useAuthToken, usePost, useSpace } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { tracker } from '../../lib/snowplow'
import { getIdFromAddress, getPostFieldValue } from '../../utils/post'
import { MemberCard } from '../MemberList/MemberCard'
import { ReplyList } from '../ReplyList'
import { SpaceCard } from '../SpaceList/SpaceCard'

import { Post as PostItem } from '.'

export const PostPage = ({ address }) => {
  const {
    data: { network },
  } = useAuthToken()
  const id = address ? getIdFromAddress(address) : ''

  const { data: post, error } = usePost({
    id,
    fields: 'withReply',
    useQueryOptions: {
      refetchOnMount: 'always',
    },
  })

  const { data: space } = useSpace({
    variables: { id: post?.spaceId },
    fields: 'default',
  })

  const title = `${
    getPostFieldValue(post, 'title') || getPostFieldValue(post, 'question')
  } - ${network?.name}`

  useEffect(() => {
    tracker.setTarget({ postId: post?.id, spaceId: space?.id })
    tracker.trackPageView(title)
    return () => tracker.setTarget({ postId: undefined, spaceId: undefined })
  }, [])

  if (!post) {
    if (error) {
      return (
        <Card>
          <Card.Content> Could not find the page</Card.Content>
        </Card>
      )
    }
    return null
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Helmet>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 sm:col-span-8">
          <PostItem
            replyBar={false}
            post={post}
            context="post"
            collapsible={false}
          />
          <ReplyList post={post} />
        </div>
        <div className="hidden sm:col-span-4 sm:flex flex-col space-y-5">
          <div>
            <MemberCard member={post?.owner?.member} />
          </div>
          <div>
            <SpaceCard space={post?.space} />
          </div>
        </div>
      </div>
    </>
  )
}
