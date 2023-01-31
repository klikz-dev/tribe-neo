import { ComposerModuleName } from './@types'

export const MentionBlotClassName = 'mentionBlot'
export const MentionBlotStylingClasses = 'text-actionPrimary-600'
export const ImageBlotClassName = 'imageBlot'

export const MENTION_SYMBOL = '@'
export const SLASH_SYMBOL = '/'
export const COLON_SYMBOL = ':'

export const SYMBOL_REGEXP = {
  [COLON_SYMBOL]: /([\s\n]:[\w\s]*)$/,
  [SLASH_SYMBOL]: /([\s\n]\/[\w\s]*)$/,
  [MENTION_SYMBOL]: /(([\s\n]@(\w+\s?\w*))\W{0})$/,
}
export const COLON_REGEXP = SYMBOL_REGEXP[COLON_SYMBOL]
export const MENTION_REGEXP = SYMBOL_REGEXP[MENTION_SYMBOL]
export const SLASH_MENU_REGEXP = SYMBOL_REGEXP[SLASH_SYMBOL]

/** List of Quill's dirt after embeds */
export const UNNECESSARY_HTML_AFTER_EMBED = [
  '<p data-reactroot=""><br></p>',
  '<p data-reactroot><br></p>',
  '<p><br></p>',
]

/** List of Quill's dirt overall */
export const UNNECESSARY_HTML = [
  // Weird red symbol that gets applied
  // automatically by Quill
  '﻿',
]

export const WINDOW_PADDING = 20

export const FILE_SIZE_LIMIT = 50000000 // 50 MB in bytes

// Tailwind font sizes for headings
export const tagClassName = {
  h2: 'text-xl',
  h3: 'text-lg',
  ol: 'list-decimal list-inside pl-6',
  ul: 'list-disc list-inside pl-6',
}

export const EMBED_INPUT_CLASS = `${ComposerModuleName.Embed}-input`
export const MAX_MENU_HEIGHT = 240
