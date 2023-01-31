import { useEffect, useState, useRef, useCallback } from 'react'

import clsx from 'clsx'

import { Input } from '../../Input'
import { ComposerEmbedProps, ComposerModuleName } from '../@types'
import { EMBED_INPUT_CLASS } from '../constants'
import { useDebounce } from '../hooks/useDebounce'
import { ComposerMediaClose } from './media/MediaClose'
import { ComposerLoading } from './media/MediaLoading'

export const ComposerEmbed = ({
  embed,
  isReadOnly,
  handleEmbedPaste,
  handleEmbedInvalid,
  quill,
  placeholder,
}: ComposerEmbedProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef(null)
  const [value, setValue] = useState(embed?.url || '')
  const debouncedValue = useDebounce(value, 300)

  const [embedObject, setEmbedObject] = useState(embed)
  const [embedLoading, setEmbedLoading] = useState(false)

  const handleClose = useCallback(
    ({ target }) => {
      const blot =
        target.closest(`[data-type="${ComposerModuleName.Embed}"]`) ||
        target.closest(`.embed`)
      blot.remove()

      const range = quill.getSelection()

      if (range == null) return

      quill.insertText(range.index, value, { link: value })
    },
    [quill, value],
  )

  const handleError = () => {
    setValue('')
    handleEmbedInvalid?.()
  }

  const handleInputPaste = useCallback(
    async e => {
      e.preventDefault()
      const value = e.clipboardData.getData('Text')

      const urlRegex =
        // eslint-disable-next-line no-useless-escape
        /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi

      const isValidURL = urlRegex.test(value)

      if (!isValidURL && handleEmbedInvalid) {
        handleEmbedInvalid()
        return
      }

      setEmbedLoading(true)
      setValue(value)

      if (handleEmbedPaste) {
        try {
          const embed = await handleEmbedPaste(value)

          setEmbedLoading(false)

          if (embed?.html) {
            setEmbedObject(embed)
          } else {
            handleError()
          }
        } catch (error) {
          handleError()
        }
      }
    },
    [handleEmbedInvalid, handleEmbedPaste, handleError],
  )

  const showURLInput = !isReadOnly && !embedObject

  useEffect(() => {
    if (!showURLInput) return

    inputRef.current?.focus()
  }, [quill, showURLInput])

  const PreviewProps = {}

  if (embedObject?.html) {
    // eslint-disable-next-line dot-notation
    PreviewProps['dangerouslySetInnerHTML'] = { __html: embedObject.html }
  }

  return (
    <div className={ComposerModuleName.Embed} data-embed-id={embedObject?.id}>
      {showURLInput && (
        <Input
          defaultValue={debouncedValue}
          placeholder={placeholder}
          onPaste={handleInputPaste}
          ref={inputRef}
          className={clsx(
            'focus:border-transparent focus:ring-transparent',
            EMBED_INPUT_CLASS,
          )}
          wrapperClassName="shadow-none"
        />
      )}

      {embedLoading && <ComposerLoading handleClose={handleClose} />}

      {!embedLoading && embedObject && (
        <div className="preview relative w-full">
          <figure ref={previewRef} {...PreviewProps} />

          {!isReadOnly && <ComposerMediaClose onClick={handleClose} />}
        </div>
      )}
    </div>
  )
}
