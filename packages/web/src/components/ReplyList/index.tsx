import { Post, PostStatus } from '@tribeplatform/gql-client/types'
import { useReplies } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { ReplyBar } from '../Post/ReplyBar'
import { Reply } from './Reply'

export const ReplyList = ({ post }: { post: Post }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useReplies({
      variables: {
        limit: 5,
        postId: post.id,
        reverse: true,
      },
      fields: 'default',
      useInfiniteQueryOptions: {
        refetchOnMount: 'always',
      },
    })

  const canReply = post.status !== PostStatus.DELETED

  if (isLoading) {
    return (
      <Card className="mt-5">
        <Card.Content className="pb-3 sm:pb-3 px-5 flex flex-col space-y-6">
          {[...Array(3)].map((_e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="animate-pulse flex space-x-3" key={i}>
              <div className="rounded-full h-10 w-10 bg-surface-300 " />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-surface-300 rounded-full w-4/6"></div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-surface-300 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </Card.Content>
      </Card>
    )
  }

  const { nodes: replies } = simplifyPaginatedResult<Post>(data)

  return (
    <Card className="mt-5">
      <Card.Content className="flex flex-col space-y-6 px-5">
        {replies?.length > 0 || canReply ? (
          <>
            {hasNextPage && (
              <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                  <Link
                    variant="inherit"
                    className="text-sm leading-5 font-medium text-basicSurface-500"
                    onClick={() => {
                      fetchNextPage()
                    }}
                  >
                    View more replies
                  </Link>
                  {isFetching && <SpinnerIcon className="animate-spin" />}
                </div>
                <div className="text-basicSurface-400 text-sm leading-5 font-normal">
                  {replies.length} of {post?.repliesCount}
                </div>
              </div>
            )}
            <div className="relative flex flex-col space-y-6">
              {replies?.reverse()?.map(reply => (
                <Reply key={reply.id} reply={reply} canReply />
              ))}
              {canReply && <ReplyBar post={post} />}
              <div className="absolute -z-10 w-[2px] ml-[-1px] top-1 left-6 bottom-0 bg-surface-200" />
            </div>
          </>
        ) : null}
      </Card.Content>
    </Card>
  )
}
