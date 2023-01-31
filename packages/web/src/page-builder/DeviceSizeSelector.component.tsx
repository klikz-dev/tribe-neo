import { Dispatch, SetStateAction } from 'react'

import DesktopComputerIcon from '@heroicons/react/outline/DesktopComputerIcon'
import DeviceMobileIcon from '@heroicons/react/outline/DeviceMobileIcon'
import DeviceTabletIcon from '@heroicons/react/outline/DeviceTabletIcon'
import clsx from 'clsx'

import { Link } from '@tribeplatform/react-ui-kit/Link'

export type DeviceSizeSelectorProps = {
  screenSize: string
  setScreenSize: Dispatch<SetStateAction<string>>
}

export const DeviceSizeSelector = ({
  screenSize,
  setScreenSize,
}: DeviceSizeSelectorProps) => {
  const devices = [
    { size: 'sm', Icon: DeviceMobileIcon, w: 7 },
    { size: 'lg', Icon: DeviceTabletIcon, w: 8 },
    { size: '2xl', Icon: DesktopComputerIcon, w: 9 },
  ]
  const getIcon = device => (
    <device.Icon
      className={clsx(
        screenSize === device.size
          ? 'text-actionPrimary-500'
          : 'text-basicSecondary-500',
      )}
    />
  )
  return (
    <div className="flex flex-row space-x-4 m-auto justify-center items-center">
      {devices.map(device => (
        <div
          key={device.size}
          className={clsx(
            'flex-shrink-0 h-full',
            device.w === 7 && 'w-7',
            device.w === 8 && 'w-8',
            device.w === 9 && 'w-9',
          )}
        >
          {device.size === screenSize ? (
            getIcon(device)
          ) : (
            <Link href="#" onClick={() => setScreenSize(device.size)}>
              {getIcon(device)}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
