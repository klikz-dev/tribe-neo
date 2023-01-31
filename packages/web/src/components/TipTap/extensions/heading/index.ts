import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/react'

/**
 * This extension is here only to use the correct class name per each heading
 * If we won't need the class names anymore we should remove this extension and use the original one from the starter-kit extension.
 */
const correspondingClassNames = {
  1: 'text-xl',
  2: 'text-xl',
  3: 'text-lg',
  4: 'text-base',
  5: 'text-base',
  6: 'text-base',
}

export const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel ? node.attrs.level : this.options.levels[0]

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: correspondingClassNames[level],
      }),
      0,
    ]
  },
})
