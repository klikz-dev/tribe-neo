import { FC, useState } from 'react'

import clsx from 'clsx'
import { useClipboard } from 'use-clipboard-copy'

import {
  FormControl,
  FormControlInputProps,
} from '@tribeplatform/react-ui-kit/FormControl'
import { Link } from '@tribeplatform/react-ui-kit/Link'

export type FormControlInputCopyProps = FormControlInputProps & {
  hidden?: boolean
}

export const FormControlInputCopy: FC<FormControlInputCopyProps> = props => {
  const { value, hidden = false, ...rest } = props

  const [copied, setCopied] = useState(false)
  const clipboard = useClipboard()

  const [showValue, setShowValue] = useState(!hidden)

  const addon = hidden ? (
    <div className="flex items-center h-full pr-2">
      <Link onClick={() => setShowValue(!showValue)} variant="neutral">
        {showValue ? 'Hide' : 'Show'}
      </Link>
    </div>
  ) : null

  return (
    <FormControl.Input
      {...rest}
      value={value}
      onClick={e => e.currentTarget.select()}
      type={showValue ? 'text' : 'password'}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      trailingAddon={
        <div className="flex h-full divide-x">
          {addon}
          <div className={clsx('flex items-center h-full', !!addon && 'pl-2')}>
            <Link
              onClick={() => {
                clipboard.copy(value)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              variant="neutral"
            >
              {copied ? 'Copied' : 'Copy'}
            </Link>
          </div>
        </div>
      }
    />
  )
}
