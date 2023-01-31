import ClockIcon from '@heroicons/react/outline/ClockIcon'

import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

export const PostPendingIndicator = () => (
  <Tooltip>
    <Tooltip.Trigger className="flex">
      <Badge variant="secondary" trailingIcon={<ClockIcon />}>
        Pending Review
      </Badge>
    </Tooltip.Trigger>
    <Tooltip.Panel>
      Your post will be visible to others once it’s been reviewed by a
      moderator.
    </Tooltip.Panel>
  </Tooltip>
)
