import { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

export const usePreventNavigation = (
  blockNavigation = true,
  callback?: () => void,
) => {
  const history = useHistory()

  useEffect(() => {
    const unblock = history.block(({ pathname }) => {
      if (!blockNavigation) {
        unblock()
        history.push(pathname)
        return
      }

      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          'If you leave this page, any unsaved changes will be lost.',
        )
      ) {
        callback?.()
        unblock()
        history.push(pathname)
        return
      }
      // prevent navigation
      return false
    })

    return unblock
  }, [blockNavigation, callback, history])
}
