import { FC, ReactElement, ReactNode } from 'react'

import clsx from 'clsx'

import { Select } from '@tribeplatform/react-ui-kit/Select'

import { QuillType } from '../@types'
import { getCursorPosition } from '../utils'

const staticProps = {
  listOffsetTop: 35,
}

/**
 * This component renders <Select /> with a hidden button
 * and with an automatically shown list
 */
export const ComposerSelect: FC<{
  // Valid Quill object
  quill: QuillType

  // Array of <Select.Item />
  children: ReactNode

  // Id for "data-id" attribute for identifying the list
  id: string

  onChange: (newValue: any) => void

  button?: ReactElement

  className?: string

  // Any prop for <Select />
  [key: string]: any
}> = ({ quill, children, className, id, onChange, button, ...selectProps }) => {
  const { left, top } = getCursorPosition(quill)

  return (
    <Select
      value={null}
      onChange={onChange}
      className={clsx('w-56 absolute ignore-typography', className)}
      popperStyles={{
        left,
        top: top + staticProps.listOffsetTop,
        overflow: 'hidden',
        borderRadius: '0.375rem',
      }}
      {...selectProps}
    >
      {button || <Select.Button className="hidden" />}
      <Select.Items
        className="w-60"
        data-id={id}
        transitionProps={{ show: true }}
        usePortal={false}
      >
        {children}
      </Select.Items>
    </Select>
  )
}
