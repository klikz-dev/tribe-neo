import ShieldCheckIcon from '@heroicons/react/outline/ShieldCheckIcon'

import { RoleType, Member } from '@tribeplatform/gql-client/types'
import { Badge } from '@tribeplatform/react-ui-kit/Badge'

export const RoleBadge = ({ member, ...rest }: { member: Member }) => {
  if (!member) return null

  if (member?.role?.type === RoleType.ADMIN)
    return (
      <Badge className="mx-2" leadingIcon={<ShieldCheckIcon />} {...rest}>
        Admin
      </Badge>
    )

  if (member?.role?.type === RoleType.MODERATOR)
    return (
      <Badge className="mx-2" leadingIcon={<ShieldCheckIcon />} {...rest}>
        Mod
      </Badge>
    )

  return null
}
