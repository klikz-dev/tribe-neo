import { forwardRef } from 'react'

import clsx from 'clsx'

import { Textarea } from '../Textarea'
import { FormControlMeta } from './FormControlMeta'
import { Label } from './Label'
import { FormControlTextareaProps } from './types'

export const FormControlTextarea = forwardRef<
  HTMLTextAreaElement,
  FormControlTextareaProps
>((props, ref) => {
  const {
    name,
    label,
    placeholder,
    helperText,
    cornerHint,
    error,
    invalid,
    ...rest
  } = props

  return (
    <div>
      {label ? (
        <Label htmlFor={name} helperText={cornerHint}>
          {label}
        </Label>
      ) : null}
      <div className={clsx(!!label && 'mt-1')}>
        <Textarea
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
