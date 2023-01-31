import { useEffect } from 'react'

import { useMonaco } from '@monaco-editor/react'

import {
  completionItemProvider,
  completionVariableProvider,
} from './monaco-utils'

export const useCodeEditor = () => {
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      const provider = monaco.languages.registerCompletionItemProvider(
        'liquid',
        completionVariableProvider,
      )

      monaco.languages.registerCompletionItemProvider(
        'liquid',
        completionItemProvider,
      )

      return () => provider.dispose()
    }
  }, [monaco])

  return monaco
}
