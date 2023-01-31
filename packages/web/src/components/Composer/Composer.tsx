import { FC, memo, forwardRef, RefObject, useEffect } from 'react'

import { ComposerRefImperativeHandle, ReactQuillProps } from './@types'
import { Attachments } from './components/Attachment/Attachments'
import { CustomFunctionality } from './CustomFunctionality'
import { ReactQuill } from './ReactQuill'

const ComposerWithRef = forwardRef(
  (
    {
      embeds,
      mentions,
      onChange,
      placeholder,
      value,
      onMount,
      onUnmount,
      modules = {},
      isReadOnly,
      attachments,
      children,
      className,
      onAttachmentDelete,
      handleAttachmentUpload,
    }: ReactQuillProps,
    forwardedRef?: RefObject<ComposerRefImperativeHandle>,
  ): JSX.Element | null => {
    useEffect(() => {
      if (forwardedRef?.current) {
        onMount?.()
      }

      return () => {
        onUnmount?.()
      }
    }, [forwardedRef, onMount, onUnmount])

    const quill = forwardedRef?.current?.getQuill?.()

    const commonProps = {
      embeds,
      mentions,
      attachments,
      value,
    }

    return (
      <>
        <div className={className}>
          <ReactQuill
            {...commonProps}
            className="flex flex-col flex-grow"
            onAttachmentDelete={onAttachmentDelete}
            handleAttachmentUpload={handleAttachmentUpload}
            onChange={onChange}
            placeholder={placeholder}
            ref={forwardedRef}
            modules={modules}
          />

          {!!attachments?.length && (
            <div className="pb-5">
              <Attachments
                onAttachmentDelete={onAttachmentDelete}
                isReadOnly={isReadOnly}
                attachments={attachments}
              />
            </div>
          )}
          {children}
        </div>

        {quill && <CustomFunctionality modules={modules} quill={quill} />}
      </>
    )
  },
)

export const Composer: FC<ReactQuillProps> = memo(
  ({ forwardedRef, ...props }) => (
    <ComposerWithRef {...props} ref={forwardedRef} />
  ),
)

// Lazy loading
// eslint-disable-next-line import/no-default-export
export default Composer
