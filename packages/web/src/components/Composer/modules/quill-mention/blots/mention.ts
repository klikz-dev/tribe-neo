import Quill from 'quill'

import { ComposerModuleName } from '../../../@types'
import {
  MentionBlotClassName,
  MentionBlotStylingClasses,
} from '../../../constants'

const Embed = Quill.import('blots/embed')

class MentionBlot extends Embed {
  static blotName = ComposerModuleName.Mention

  static tagName = 'a'

  static className = MentionBlotClassName

  private static focused: boolean

  static create(data) {
    const node = super.create()

    this.focused = false
    node.innerHTML += `@${data.title}`
    node.setAttribute('data-id', data.id)
    node.setAttribute('data-type', ComposerModuleName.Mention)
    node.classList.add(MentionBlotStylingClasses)

    return node
  }

  static value(domNode) {
    if (!domNode) return
    const container = domNode.querySelector('span')
    const mentionContent = container ? container.innerHTML : ''
    const title = mentionContent.replace('@', '')
    return { title, id: domNode.dataset?.id }
  }

  static formats(node) {
    const container = node.querySelector('span')
    const mentionContent = container ? container.innerHTML : ''
    const title = mentionContent.replace('@', '')

    const focus = () => {
      node.classList.add(...['px-1', 'border', 'border-actionPrimary-500'])
      this.focused = true
    }

    return {
      title,
      id: node.dataset?.id,
      focus,
      focusable: !this.focused,
    }
  }
}

Quill.register(MentionBlot)
