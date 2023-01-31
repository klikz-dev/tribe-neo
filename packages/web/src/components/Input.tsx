import { forwardRef } from 'react'

import {
  Input as DumbInput,
  InputProps as DumbInputProps,
} from '@tribeplatform/react-ui-kit/Input'
import { Link } from '@tribeplatform/react-ui-kit/Link'

type InputProps = DumbInputProps & {
  trailingAddonCopy?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { trailingAddonCopy = false, value, ...rest } = props
  delete rest.children

  if (trailingAddonCopy) {
    rest.trailingAddon = (
      <Link onClick={() => navigator.clipboard.writeText(value as string)}>
        Copy
      </Link>
    )
  }
  return <DumbInput {...rest} ref={ref} value={value} />
})
