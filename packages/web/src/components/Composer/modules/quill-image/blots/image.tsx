// eslint-disable-next-line import/order
import Quill from 'quill'
import ReactDOM from 'react-dom'

import { ComposerImage } from '../../../components/Image'
import { ImageBlotClassName } from '../../../constants'

const Embed = Quill.import('blots/embed')

Quill.debug(false)

const Type = 'image'
class CustomImageBlot extends Embed {
  static blotName = 'image'

  static tagName = ['figure', 'div']

  static className = ImageBlotClassName

  private static focused: boolean

  static create({ uploadPromise, file, src = null }) {
    const node = super.create()
    this.focused = false
    const Component = (
      <ComposerImage
        uploadPromise={uploadPromise}
        src={src}
        file={file}
        isReadOnly={false}
      />
    )
    ReactDOM.render(Component, node)
    node.removeAttribute('src')
    node.setAttribute('data-type', Type)
    return node
  }

  static value(node) {
    const img = node.querySelector('img')
    if (!img) return ''
    return { src: img.getAttribute('src') }
  }

  static formats(node) {
    const img = node.querySelector('img')
    if (!img) return ''

    const focus = () => {
      img.classList.add(...['border-2', 'border-actionPrimary-500'])
      this.focused = true
    }

    return {
      src: img.getAttribute('src'),
      focus,
      focusable: !this.focused,
    }
  }
}

Quill.register(CustomImageBlot)
