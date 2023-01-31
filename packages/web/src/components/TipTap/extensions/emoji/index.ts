import { Node } from '@tiptap/core'
import { PasteRule } from '@tiptap/react'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import { BaseEmoji, emojiIndex } from 'emoji-mart-virtualized'
import { PluginKey } from 'prosemirror-state'

import { renderEmojiPopup } from './options'

export type EmojiOptions = {
  HTMLAttributes: Record<string, any>
  suggestion: Omit<SuggestionOptions, 'editor'>
}

export const EmojiPluginKey = new PluginKey('emoji')

const defaultSuggestions = [
  {
    id: '+1',
    colons: ':+1:',
    native: '👍',
  },
  {
    id: 'heart',
    colons: ':heart:',
    native: '❤️',
  },
  {
    id: 'tada',
    colons: ':tada:',
    native: '🎉',
  },
  {
    id: 'smile',
    colons: ':smile:',
    native: '😄',
  },
  {
    id: 'open_mouth',
    colons: ':open_mouth:',
    native: '😮',
  },
  {
    id: 'cry',
    colons: ':cry:',
    native: '😢',
  },
]
const EMOJI_INPUT_REGEX = /:([^:\s]*(?:::[^:\s]*)*):/g

export const Emoji = Node.create<EmojiOptions>({
  name: 'emoji',

  addOptions() {
    return {
      HTMLAttributes: {},
      suggestion: {
        char: ':',
        pluginKey: EmojiPluginKey,
        items: async ({ query }) => {
          if (!query || query.length < 1) return defaultSuggestions

          const result = (emojiIndex.search(query) || []) as BaseEmoji[]

          if (query.length < 3) {
            return result.slice(0, 20)
          }

          return result
        },
        render: renderEmojiPopup,
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const { nodeAfter } = editor.view.state.selection.$to
          const overrideSpace = nodeAfter?.text?.startsWith(' ')

          if (overrideSpace) {
            range.to += 1
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: 'text',
                text: props.native,
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
            .run()
        },
      },
    }
  },

  group: 'inline',

  inline: true,

  atom: true,

  addPasteRules() {
    const pasteRule = new PasteRule({
      find: EMOJI_INPUT_REGEX,
      handler: ({ state, range, match }) => {
        const emojiSuggestions = emojiIndex.search(match[1])
        if (!emojiSuggestions || emojiSuggestions?.length < 1) {
          return
        }

        const emoji = emojiSuggestions[0]
        const insert = emoji.native
        const start = range.from
        const end = range.to

        state.tr.insertText(insert, start, end)
      },
    })

    return [pasteRule]
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
