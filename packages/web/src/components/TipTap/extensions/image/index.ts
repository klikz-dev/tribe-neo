import { mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import clsx from 'clsx'

type Attr = {
  src: string
  alt?: string
  title?: string
  id?: string
  sizes?: 'full' | 'medium'
  loading?: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    'async-image': {
      /**
       * Add an image
       */
      setImage: (options: Attr) => ReturnType
      setImageAttributes: (options: Attr) => ReturnType
    }
  }
}

const NAME = 'async-image'
export const AsyncImage = Image.extend({
  name: NAME,

  addAttributes() {
    return {
      ...this.parent?.(),
      'data-type': {
        default: 'image',
      },
      id: {
        default: null,
        rendered: false,
      },
      loading: {
        default: null,
        rendered: false,
      },
      sizes: {
        default: 'medium',
        rendered: false,
      },
    }
  },
  addCommands() {
    return {
      setImage:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
      setImageAttributes:
        attributes =>
        ({ commands }) =>
          commands.updateAttributes(NAME, attributes),
    }
  },

  parseHTML: () => [
    {
      tag: 'img[src]',
      getAttrs: dom => {
        if (typeof dom === 'string') return {}
        const element = dom as HTMLImageElement

        return {
          id: element.getAttribute('data-id'),
          src: element.getAttribute('src'),
          title: element.getAttribute('title'),
          alt: element.getAttribute('alt'),
        }
      },
    },
  ],

  renderHTML({ node, HTMLAttributes }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { size, loading, id } = node.attrs
    HTMLAttributes.class = clsx(
      'h-32 object-contain',
      loading && 'opacity-40',
      // size === 'full' && 'w-full'
    )
    const type = 'image'
    HTMLAttributes['data-id'] = id
    HTMLAttributes['data-type'] = type

    return [
      'figure',
      {
        'data-type': type,
        'data-id': id,
      },
      ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ]
  },
})
