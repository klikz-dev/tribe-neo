import { forwardRef } from 'react'

import clsx from 'clsx'
import { RemixiconReactIconComponentType } from 'remixicon-react'

import { Button, ButtonProps } from '@tribeplatform/react-ui-kit/Button'

type ComposerIconButtonProps = ButtonProps & {
  icon: RemixiconReactIconComponentType
}

/**
 * Square button that contains only an icon
 */
export const ComposerIconButton = forwardRef(
  ({ icon: Icon, className, ...props }: ComposerIconButtonProps, ref: any) => (
    <Button
      ref={ref}
      size="sm"
      variant="outline"
      leadingIcon={<Icon size="16px" />}
      className={clsx('rounded-md', className)}
      {...props}
    />
  ),
)
