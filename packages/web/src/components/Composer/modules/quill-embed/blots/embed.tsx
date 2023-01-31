import Quill from 'quill'
import ReactDOM from 'react-dom'

import { ComposerModuleName } from '../../../@types'
import { ComposerEmbed } from '../../../components/Embed'

const BlockEmbed = Quill.import('blots/block/embed')

const tagName = 'div'
const className = ComposerModuleName.Embed
export const EmbedSelector = `${tagName}.${className}[data-type="${ComposerModuleName.Embed}"]`
export const EmbedCreateEvent = `${ComposerModuleName.Embed}:create`
class EmbedBlot extends BlockEmbed {
  static blotName = ComposerModuleName.Embed

  static tagName = tagName

  static className = className

  static create({
    quill,
    handleEmbedPaste,
    handleEmbedInvalid,
    isReadOnly = false,
    placeholder,
    embed,
  }) {
    const node = super.create()
    node.classList.add(this.className)
    node.setAttribute('data-type', ComposerModuleName.Embed)

    const Component = (
      <ComposerEmbed
        quill={quill}
        handleEmbedPaste={handleEmbedPaste}
        handleEmbedInvalid={handleEmbedInvalid}
        isReadOnly={isReadOnly}
        placeholder={placeholder}
        embed={embed}
      />
    )
    ReactDOM.render(Component, node)
    return node
  }

  static value(node) {
    const preview = node.querySelector('.preview')
    const embed = node.querySelector(`[data-${ComposerModuleName.Embed}-id]`)
    const embedId = embed
      ? embed.getAttribute(`data-${ComposerModuleName.Embed}-id`)
      : ''

    return {
      embed: {
        url: '',
        html: preview?.innerHTML || '',
        id: embedId,
      },
    }
  }
}

Quill.register(EmbedBlot)
