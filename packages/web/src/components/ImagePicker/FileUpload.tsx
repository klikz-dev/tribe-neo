import { useCallback, useRef } from 'react'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'

export const FileUpload = ({
  onChange,
  accept = 'image/*',
}: {
  /** File input accept attribute */
  accept?: string
  onChange?: (file: File) => void
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>()

  const _onChange = useCallback(
    event => {
      const file = event.target.files?.[0]
      onChange?.(file)
    },
    [onChange],
  )

  return (
    <div className="flex flex-col items-center justify-center w-96 max-w-full pt-10 mx-auto">
      <Button
        onClick={() => {
          hiddenFileInput.current.click()
        }}
      >
        Choose an image
      </Button>
      <input
        type="file"
        className="hidden"
        ref={hiddenFileInput}
        onChange={_onChange}
        accept={accept}
        hidden
      />
      <FormControl.HelperText className="mt-3">
        The file size limit is 10MB.
      </FormControl.HelperText>
    </div>
  )
}
