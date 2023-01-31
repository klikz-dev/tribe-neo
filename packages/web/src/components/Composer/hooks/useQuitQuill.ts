import { useCallback } from 'react'

export const useQuitQuill = () => {
  const canQuit = useCallback((quillRef, attachmentsCount?: number) => {
    const isEditorTouched = quillRef.current?.isTouched()

    const isTouched = isEditorTouched || attachmentsCount > 0

    return (
      !isTouched ||
      // eslint-disable-next-line no-alert
      window.confirm(
        'You have unsaved changes. Are you sure you want to discard them?',
      )
    )
  }, [])

  return { canQuit }
}
