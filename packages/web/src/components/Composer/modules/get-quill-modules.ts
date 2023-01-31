import { ReactQuillProps } from '../@types'

const bindings = {
  // TODO: bring this back once we want to have unremovable blots again. it has so many edge cases for now
  // backspace: {
  //   key: 'Backspace',
  //   handler(range) {
  //     const beforeCursorIndex = range.index - 1
  //     const format = this.quill.getFormat(beforeCursorIndex, range.index)
  //     if (format && format.focusable && typeof format.focus === 'function') {
  //       format.focus()
  //     } else {
  //       return true
  //     }
  //   },
  // },
}

export const getQuillModules = (modules?: ReactQuillProps['modules']) => ({
  ...modules,
  keyboard: {
    bindings: {
      ...bindings,
      ...modules.bindings,
    },
  },
  clipboard: {
    allowed: {
      tags: [
        'a',
        'b',
        'i',
        'p',
        'br',
        'ul',
        'ol',
        'li',
        'pre',
        'span',
        'h1',
        'h2',
        'div',
      ],
      attributes: ['href', 'rel', 'target'],
    },
    magicPasteLinks: false,
  },
  toolbar: [
    ['bold', 'italic', 'link'],
    [{ header: 1 }, { header: 2 }, 'blockquote', 'code'],
    [{ align: ['', 'center', 'right', 'justify'] }],
  ],
})
