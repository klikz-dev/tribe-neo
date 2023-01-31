import { Node } from '@tiptap/core'
import { Editor, Range } from '@tiptap/react'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import { PluginKey } from 'prosemirror-state'

import { DefaultSlashMenuItems, MenuItem } from './items'
import { renderSlashMenuPopup } from './options'

export type SlashMenuOptions = {
  HTMLAttributes: Record<string, any>
  command?: ({
    editor,
    props,
    range,
  }: {
    editor: Editor
    props: MenuItem
    range: Range
  }) => void
  suggestion: Omit<SuggestionOptions, 'editor'>
}

export const SlashMenuPluginKey = new PluginKey('slash-menu')

export const SlashMenu = Node.create<SlashMenuOptions>({
  name: 'slash-menu',

  addOptions() {
    return {
      HTMLAttributes: {},
      command: undefined,
      suggestion: {
        char: '/',
        pluginKey: SlashMenuPluginKey,
        items: async ({ query }) => {
          if (!query || query.length <= 1) return DefaultSlashMenuItems

          return DefaultSlashMenuItems.filter(item =>
            item?.label?.toLowerCase().includes(query.toLowerCase()),
          )
        },
        render: renderSlashMenuPopup,
      },
    }
  },

  group: 'inline',

  inline: true,

  atom: true,

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        command: this.options.command,
        ...this.options.suggestion,
      }),
    ]
  },
})
