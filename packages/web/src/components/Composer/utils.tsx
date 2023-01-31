import { MutableRefObject } from 'react'

import Quill from 'quill'

import './modules/quill-mention/blots/mention'
import './modules/quill-image/blots/image'
import './modules/quill-embed/blots/embed'
import './modules/quill-clipboard'

import { QuillType } from './@types'
import { SYMBOL_REGEXP, tagClassName } from './constants'
import { LinkBlot } from './modules/link'

const Block = Quill.import('blots/block')

class HeaderBlot extends Block {
  static blotName = 'header'

  static tagName = ['h2', 'h3']

  static create(headingNumber: number) {
    const node = super.create(headingNumber)
    const tagName = node.tagName.toLowerCase()

    // Tailwind resets headings styles, so we
    // have to apply a font size for them
    node.classList.add(tagClassName[tagName])

    return node
  }
}

export const initQuill = () => {
  Quill.register(HeaderBlot)
  Quill.register(LinkBlot)
}

export function getCursorPosition(quill: QuillType, absolute = false) {
  let cursorPosBounds
  try {
    const cursorPos = quill.getSelection()?.index

    cursorPosBounds = quill.getBounds(cursorPos)
  } catch (e) {
    cursorPosBounds = { left: 0, top: 0, height: 0 }
  }

  if (!absolute) return cursorPosBounds

  // Quill`s relative placement to the page (from top and left)
  const containerPlacement = quill.container.getBoundingClientRect()
  const containerTop = containerPlacement.top + window.scrollY
  const containerLeft = containerPlacement.left + window.scrollX

  const cursorPosAbsolute = {
    left: containerLeft + cursorPosBounds.left,
    top: containerTop + cursorPosBounds.top,
    height: cursorPosBounds.height,
  }

  return {
    top: cursorPosAbsolute.top + cursorPosAbsolute.height,
    left: cursorPosAbsolute.left - 15,
  }
}

type SymbolSearchTermProps = {
  quill: Quill
  symbolPositionRef?: MutableRefObject<number | undefined>
  symbol: keyof typeof SYMBOL_REGEXP
}

export const removeSymbolSearchTerm = (
  quill: SymbolSearchTermProps['quill'],
  symbol: SymbolSearchTermProps['symbol'],
) => {
  const cursorPosition = quill.getSelection(true).index || 0

  // Get contents before the slash symbol
  const contents = quill.getContents(0, cursorPosition)
  const contentsAfterSlash = quill.getContents(cursorPosition)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newOperations = contents.map((op, opIndex, opsArray) => {
    // If it's last operation and it has text insert in it
    const hasSlash =
      opIndex === opsArray.length - 1 && typeof op.insert === 'string'

    if (hasSlash) {
      op.insert = op.insert.slice(0, op.insert.lastIndexOf(symbol))
    }

    return op
  })

  contents.ops = newOperations

  contentsAfterSlash.forEach(op => contents.push(op))

  // Update the editor with the new content
  quill.setContents(contents)

  // Return cursor back to it's position
  quill.setSelection(cursorPosition - 1, 0)
}

/**
 * Finds a matching search term for a given symbol
 * @returns the search term string. Empty if something is wrong or not matching.
 */
export const getSymbolSearchTerm = ({
  quill,
  symbolPositionRef,
  symbol,
}: SymbolSearchTermProps) => {
  // Can't focus to the editor here, because
  // emoji picker gets automatically closed
  // (because outside element was clicked)
  const cursorPosition = quill.getSelection()?.index

  if (typeof cursorPosition === 'undefined') return ''

  // Symbols can't be glued to whaever is before.
  // So for the line's first character we have to add a space
  const textFromStart = ` ${quill.getText(0, cursorPosition)}`

  const matches = textFromStart.match(SYMBOL_REGEXP[symbol])
  const hasValidMatch = Array.isArray(matches)

  // Prepare the first match
  const firstMatch = matches?.[0]?.trimStart() || ''

  let match = ''

  // If the search term contains a line break
  if (!firstMatch || firstMatch.includes('\n')) {
    // Return only the parsed search term itself
    match = ''
  } else {
    match = firstMatch?.trim().replace(symbol, '') || ''
  }

  if (symbolPositionRef) {
    symbolPositionRef.current = hasValidMatch
      ? cursorPosition - match.length
      : undefined
  }

  return match
}
