import { MemberPostList } from './MemberPostList'
import { SpacePostList } from './SpacePostList'

export const PostList = ({
  memberId,
  spaceId,
  tagId,
}: {
  memberId?: string
  spaceId?: string
  tagId?: string
}) => {
  if (spaceId) return <SpacePostList spaceId={spaceId} tagId={tagId} />
  return <MemberPostList memberId={memberId} />
}
