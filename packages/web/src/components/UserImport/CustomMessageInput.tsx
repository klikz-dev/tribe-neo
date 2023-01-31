import { ChangeEvent, useCallback, useState } from 'react'

import XIcon from '@heroicons/react/solid/XIcon'
import clsx from 'clsx'

import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { includesUrl } from '../../lib/validator.utils'

export const CUSTOM_MESSAGE_LIMIT = 1024

export const CustomMessageInput = ({ register, errors, setValue }) => {
  const [showCustomMessage, setShowCustomMessage] = useState(false)
  const [customMessageLength, setCustomMessageLength] = useState(0)

  const close = () => {
    setValue('customMessage', '')
    setShowCustomMessage(false)
  }

  const handleCustomMessageChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setCustomMessageLength(event.target.value.length)
    },
    [],
  )

  if (showCustomMessage) {
    return (
      <div className="relative">
        <FormControl.Textarea
          invalid={!!errors?.customMessage?.message}
          label="Custom message"
          error={errors?.customMessage?.message}
          {...register('customMessage', {
            validate: value => {
              if (includesUrl(value)) {
                return 'For security reasons, URLs are not allowed here'
              }
              return true
            },
          })}
          onChange={handleCustomMessageChange}
          data-testid="custom-message-input"
        />
        <div
          className={clsx(
            'flex justify-end text-sm py-2',
            customMessageLength < CUSTOM_MESSAGE_LIMIT
              ? 'text-basicSurface-400 '
              : 'text-danger-400 ',
          )}
        >
          {customMessageLength}/{CUSTOM_MESSAGE_LIMIT}
        </div>
        <div className="absolute top-0 right-0 cursor-pointer" onClick={close}>
          <XIcon
            className="w-5 h-5"
            onClick={close}
            data-testid="custom-message-remove"
            aria-label="Close"
          />
        </div>
      </div>
    )
  }

  return (
    <FormControl>
      <FormControl.Label>Custom message</FormControl.Label>
      <div className="text-sm text-basicSurface-500">
        <Link
          onClick={() => setShowCustomMessage(true)}
          href="#"
          data-testid="add-custom-message"
        >
          Add a custom message
        </Link>{' '}
        to the invitation
      </div>
    </FormControl>
  )
}
