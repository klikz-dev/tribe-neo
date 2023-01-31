import { FC } from 'react'

import { Toggle } from '../Toggle'
import { FormControlMeta } from './FormControlMeta'
import { FormControlToggleProps } from './types'

export const FormControlToggle: FC<FormControlToggleProps> = props => {
  const {
    name,
    label,
    helperText,
    error,
    invalid,
    checked,
    onChange,
    className,
    ...rest
  } = props
  return (
    <div className={className}>
      <Toggle
        {...rest}
        checked={checked}
        onChange={onChange}
        name={name}
        title={label}
      />
      <div className="-mt-2">
        <FormControlMeta {...{ helperText, error, invalid }} />
      </div>
    </div>
  )
}
