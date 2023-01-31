import { FC } from 'react'

import clsx from 'clsx'

import { FormControlLabelProps } from '@tribeplatform/react-ui-kit/FormControl/types'

export const Label: FC<FormControlLabelProps> = props => {
  const { hidden = false, helperText, children, className, ...rest } = props

  const label = (
    <label
      className={clsx(
        'block font-medium text-basicSurface-700',
        hidden && 'sr-only',
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  )

  if (helperText) {
    return (
      <div className="flex justify-between">
        {label}
        <span className="text-sm text-basicSurface-500">{helperText}</span>
      </div>
    )
  }

  return label
}
