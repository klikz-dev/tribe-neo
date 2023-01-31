import escapeHtml from 'escape-html'
import { Text } from 'slate'
import { jsx } from 'slate-hyperscript'

import { ELEMENT_TAGS, TEXT_TAGS } from './render'

export const serialize = node => {
  if (Array.isArray(node)) {
    return node.map(it => serialize(it)).join('')
  }

  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    } else if (node.italic) {
      string = `<i>${string}</i>`
    } else if (node.underline) {
      string = `<u>${string}</u>`
    }
    return string
  }
  const children = node.children?.map(n => serialize(n)).join('')
  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    case 'code':
      return `<pre>
          <code>${children}</code>
        </pre>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'heading-one':
      return `<h1>${children}</h1>`
    case 'heading-two':
      return `<h2>${children}</h2>`
    case 'heading-three':
      return `<h3>${children}</h3>`
    case 'heading-four':
      return `<h4>${children}</h4>`
    case 'heading-five':
      return `<h5>${children}</h5>`
    case 'heading-six':
      return `<h6>${children}</h6>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    default:
      return children
  }
}

export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent
  }
  if (el.nodeType !== 1) {
    return null
  }
  if (el.nodeName === 'BR') {
    return '\n'
  }

  const { nodeName } = el
  let parent = el

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    // eslint-disable-next-line prefer-destructuring
    parent = el.childNodes[0]
  }
  let children = Array.from(parent.childNodes).map(deserialize).flat()

  if (children.length === 0) {
    children = [{ text: '' }]
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    return jsx('element', attrs, children)
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    return children.map(child => jsx('text', attrs, child))
  }

  return children
}
