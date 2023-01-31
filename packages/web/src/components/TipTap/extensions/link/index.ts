import { markPasteRule, Editor } from '@tiptap/core'
import Link, { LinkOptions } from '@tiptap/extension-link'
import { find } from 'linkifyjs'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    'custom-link': {
      /**
       * Set a link mark
       */
      setLink: (attributes: { href: string; target?: string }) => ReturnType
      /**
       * Toggle a link mark
       */
      toggleLink: (attributes: { href: string; target?: string }) => ReturnType
      /**
       * Unset a link mark
       */
      unsetLink: () => ReturnType
      /**
       * Insert a link
       */
      insertLink: (attributes: {
        href: string
        text?: string
        target?: string
      }) => ReturnType
    }
  }
}

export const CustomLink = Link.extend<
  LinkOptions & { onPaste?: (matched: any, editor: Editor) => void }
>({
  name: 'custom-link',
  addOptions() {
    return {
      ...this.parent?.(),
      onPaste: undefined,
    }
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: text => {
          const matched = find(text)
            .filter(link => link.isLink)
            .map(link => ({
              text: link.value,
              index: link.start,
              data: link,
            }))

          if (matched.length > 0) {
            this.options.onPaste?.(matched, this.editor)
          }

          return matched
        },
        type: this.type,
        getAttributes: match => ({
          href: match.data?.href,
        }),
      }),
    ]
  },

  addCommands() {
    return {
      ...this.parent?.(),
      insertLink:
        ({ href, target = '_blank', text }) =>
        ({ commands }) => {
          return commands.insertContent(
            `<a href="${href}" target=${target}>${text || href}</a>`,
          )
        },
    }
  },
})
