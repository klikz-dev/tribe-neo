import { FC } from 'react'

import Editor from '@monaco-editor/react'
import clsx from 'clsx'

import { ErrorBoundary } from '../Error/ErrorBoundry'

export type CodeEditorProps = {
  initialValue: string
  onChange: (newValue: string) => void
}

export const CodeEditor: FC<CodeEditorProps> = props => {
  const { initialValue, onChange: onEditorChange } = props

  return (
    <ErrorBoundary>
      <div className="flex relative border border-neutral-300 shadow-sm ignore-typography">
        <div
          className={clsx(
            'block w-full',
            'focus:ring-actionPrimary-500 focus:border-actionPrimary-500',
            'text-basicMain-500 placeholder-basicMain-300 ',
          )}
        >
          <Editor
            defaultValue={initialValue}
            onChange={onEditorChange}
            height="50vh"
            defaultLanguage="liquid"
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
