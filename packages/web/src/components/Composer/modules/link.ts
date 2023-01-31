import Quill from 'quill'

const Inline = Quill.import('blots/inline')

export class LinkBlot extends Inline {
  static create(value) {
    const node = super.create()
    // Sanitize url value if desired
    node.setAttribute('href', value)
    // Okay to set other non-format related attributes
    // These are invisible to Parchment so must be static
    node.setAttribute('target', '_blank')
    node.classList.add('text-actionPrimary-600')
    return node
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('href')
  }
}
LinkBlot.blotName = 'link'
LinkBlot.tagName = 'a'
