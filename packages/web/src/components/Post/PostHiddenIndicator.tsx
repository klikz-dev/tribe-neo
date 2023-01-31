import EyeOffIcon from '@heroicons/react/outline/EyeOffIcon'

import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

export const PostHiddenIndicator = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger className="flex">
        <Badge variant="secondary" leadingIcon={<EyeOffIcon />} />
      </Tooltip.Trigger>
      <Tooltip.Panel>
        People won’t see this post in their Feed. It will still be available for
        the author and in search results.
      </Tooltip.Panel>
    </Tooltip>
  )
}
