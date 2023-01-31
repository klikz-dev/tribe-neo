import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { Embed as EmbedType } from '@tribeplatform/gql-client/types'

import { Embed as EmbedComponent } from './Embed'

export interface EmbedOptions {
  embeds: EmbedType[]
  HTMLAttributes: Record<string, any>
  getEmbed: any
}

interface EmbedAttr {
  embed?: EmbedType
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embed: {
      /**
       * Add an embed
       */
      setEmbed: (options: EmbedAttr) => ReturnType
    }
  }
}

export const Embed = Node.create<EmbedOptions>({
  name: 'embed',

  inline: false,
  group: 'block',

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      embeds: [],
      getEmbed: undefined,
    }
  },

  addAttributes() {
    return {
      embed: {
        default: undefined,
        rendered: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type=embed]',
        getAttrs: dom => {
          if (typeof dom === 'string') return {}
          const element = dom as HTMLImageElement
          const id = element.getAttribute('data-id')
          const embed = this.options.embeds?.find(e => e.id === id)

          if (!embed) return {}

          return {
            embed,
          }
        },
      },
    ]
  },

  renderHTML({ node }) {
    const { embed } = node.attrs
    if (!embed) return null
    return [
      'div',
      {
        'data-type': 'embed',
        'data-id': embed.id,
        'data-embed-url': embed.url,
      },
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedComponent)
  },

  addCommands() {
    return {
      setEmbed:
        attrs =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          })
        },
    }
  },
})
