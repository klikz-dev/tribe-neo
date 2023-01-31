import DotsHorizontalIcon from '@heroicons/react/outline/DotsHorizontalIcon'
import ExternalLinkIcon from '@heroicons/react/outline/ExternalLinkIcon'
import PlusIcon from '@heroicons/react/outline/PlusIcon'

import {
  Button as DumbButton,
  ButtonProps as DumbButtonProps,
} from '@tribeplatform/react-ui-kit/Button'

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'ExternalLinkIcon':
      return <ExternalLinkIcon />
    case 'PlusIcon':
      return <PlusIcon />
    case 'DotsHorizontalIcon':
      return <DotsHorizontalIcon />
    default:
      return null
  }
}

export type ButtonProps = {
  callbackId?: string
  leadingIcon?: string
}

export const Button = (props: ButtonProps & DumbButtonProps) => {
  const { callbackId, leadingIcon, ...rest } = props
  console.log('callbackId', callbackId)

  return (
    <DumbButton
      {...rest}
      leadingIcon={leadingIcon ? getIcon(leadingIcon) : null}
    />
  )
}
