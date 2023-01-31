import { CommunityMemberList } from './CommunityMemberList'
import { SpaceMemberList } from './SpaceMemberList'

export const MemberList = ({ spaceId }) => {
  if (spaceId) return <SpaceMemberList spaceId={spaceId} />
  return <CommunityMemberList />
}
