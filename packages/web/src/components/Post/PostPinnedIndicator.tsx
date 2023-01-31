import LocationMarkerIcon from '@heroicons/react/solid/LocationMarkerIcon'

import { Icon } from '@tribeplatform/react-ui-kit/Icon'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

export const PostPinnedIndicator = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger className="flex bg-actionPrimary-500 text-white rounded-full h-6 w-6 p-1">
        <Icon className="h-4 w-4">
          <LocationMarkerIcon />
        </Icon>
      </Tooltip.Trigger>
      <Tooltip.Panel>Post is pinned to the space</Tooltip.Panel>
    </Tooltip>
  )
}
