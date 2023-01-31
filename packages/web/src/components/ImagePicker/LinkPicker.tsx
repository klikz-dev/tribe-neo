import { useState } from 'react'

import { Button } from '@tribeplatform/react-ui-kit/Button'
import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Input } from '@tribeplatform/react-ui-kit/Input'

export const LinkPicker: React.FC<{ onChange: (url: string) => void }> = ({
  onChange,
}) => {
  const [link, setLink] = useState<string>('')

  return (
    <div className="flex flex-col items-center justify-center w-96 max-w-full mx-auto">
      <Input
        value={link}
        onChange={e => setLink(e?.target?.value)}
        placeholder="Paste an image link..."
        name="link"
        wrapperClassName="w-full"
      />
      <Button
        className="mt-3"
        onClick={() => {
          onChange(link)
        }}
      >
        Submit
      </Button>
      <FormControl.HelperText className="mt-3">
        Works with any image from the web
      </FormControl.HelperText>
    </div>
  )
}
