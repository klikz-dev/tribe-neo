/* eslint-disable import/no-duplicates */
import { useEffect, useRef, useState } from 'react'

import CodeMirror from 'codemirror'
import { Annotation } from 'codemirror/addon/lint/lint'
import { HTMLHint, LintResult } from 'htmlhint'

import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neo.css'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/addon/hint/xml-hint.js'
import 'codemirror/addon/hint/show-hint.js'

export type CodeEditorProps = {
  onCodeChange: (newValue: string, hasError: boolean) => void
  disabled?: boolean
  initialValue?: string
  placeholder?: string
}

// HTMLHint seems to have incomplete type definitions
type HTMLHintMessage = LintResult & { type?: string }

const HTML_LINT_RULE_SET = {
  'tagname-lowercase': true,
  'tag-pair': true,
}
CodeMirror.registerHelper('lint', 'html', text => {
  const found: Annotation[] = []
  if (!HTMLHint) return found
  const messages: HTMLHintMessage[] = HTMLHint.verify(text, HTML_LINT_RULE_SET)
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]
    const startLine = message.line - 1
    const endLine = message.line - 1
    const startCol = message.col - 1
    const endCol = message.col
    found.push({
      from: CodeMirror.Pos(startLine, startCol),
      to: CodeMirror.Pos(endLine, endCol),
      message: message.message,
      severity: message.type,
    })
  }
  return found
})

export const CodeEditor = ({
  onCodeChange,
  disabled,
  initialValue,
  placeholder,
  ...rest
}: CodeEditorProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [cmInstance, setCmInstance] = useState<CodeMirror.EditorFromTextArea>()

  useEffect(() => {
    const codeChangeHandler = cm => {
      const text = cm.getValue()
      const errors: HTMLHintMessage[] = HTMLHint.verify(
        text,
        HTML_LINT_RULE_SET,
      )
      onCodeChange(
        text,
        Boolean(errors?.filter(error => error.type === 'error')?.length),
      )
    }
    if (textAreaRef.current && !cmInstance) {
      const codeMirrorInstance = CodeMirror.fromTextArea(textAreaRef.current, {
        value: initialValue,
        mode: 'text/html',
        theme: disabled ? 'disabled' : 'neo',
        readOnly: disabled,
        lineNumbers: true,
        indentWithTabs: true,
        lineWrapping: true,
        lint: true,
        placeholder,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-lint-markers',
        ],
      })
      codeMirrorInstance.on('change', codeChangeHandler)
      setCmInstance(codeMirrorInstance)
    } else if (cmInstance) {
      cmInstance.on('change', codeChangeHandler)
    }
  }, [cmInstance, disabled, initialValue, onCodeChange, placeholder])

  useEffect(() => {
    cmInstance?.setValue(initialValue || '')
    cmInstance?.refresh()
  }, [initialValue, cmInstance])

  return (
    <div className="border-2 rounded overflow-hidden" {...rest}>
      <textarea ref={textAreaRef} />
    </div>
  )
}
