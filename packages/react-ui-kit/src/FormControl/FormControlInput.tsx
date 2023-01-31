import { forwardRef } from 'react'

import clsx from 'clsx'

import { Input } from '../Input'
import { FormControlMeta } from './FormControlMeta'
import { Label } from './Label'
import { FormControlInputProps } from './types'

export const FormControlInput = forwardRef<
  HTMLInputElement,
  FormControlInputProps
>((props, ref) => {
  const { name, label, placeholder, helperText, error, invalid, ...rest } =
    props

  return (
    <div>
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <div className={clsx(!!label && 'mt-1')}>
        <Input
          name={name}
          id={name}
          placeholder={placeholder}
          invalid={invalid}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          ref={ref}
          {...rest}
        />
        <FormControlMeta {...{ helperText, error, invalid }} />
      </div>
    </div>
  )
})
