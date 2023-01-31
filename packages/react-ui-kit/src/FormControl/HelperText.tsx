import { FC } from 'react'

import clsx from 'clsx'

import { FormControlHelperTextProps } from '@tribeplatform/react-ui-kit/FormControl/types'

export const HelperText: FC<FormControlHelperTextProps> = props => {
  const { invalid = false, children, className } = props

  return (
    <p
      className={clsx(
        'text-sm first-letter:capitalize',
        !invalid && 'text-basicSurface-500',
        invalid && 'text-danger-600',
        className,
      )}
    >
      {children}
    </p>
  )
}
