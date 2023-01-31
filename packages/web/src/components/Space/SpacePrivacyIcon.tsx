import LockClosedIcon from '@heroicons/react/solid/LockClosedIcon'
import clsx from 'clsx'

import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

export const SpacePrivacyIcon = ({ space, size = 'md' }) => {
  const sizes = [size === 'md' && 'w-5 h-5', size === 'sm' && 'w-4 h-4']
  if (space.private) {
    return (
      <Tooltip>
        <Tooltip.Trigger>
          <LockClosedIcon
            className={clsx(
              'text-basicSurface-400 hover:text-basicSurface-600',
              sizes,
            )}
          />
        </Tooltip.Trigger>
        <Tooltip.Panel>Private space</Tooltip.Panel>
      </Tooltip>
    )
  }
  return null
}
