import { ComposerModuleName } from '../../../@types'
import {
  MentionBlotClassName,
  MentionBlotStylingClasses,
} from '../../../constants'

export const mentionSanitizer = (editor: HTMLElement): void => {
  const mentions = editor.querySelectorAll(
    `[data-type="${ComposerModuleName.Mention}"].${MentionBlotClassName}`,
  )

  if (!mentions || mentions?.length === 0) {
    return
  }

  mentions.forEach(mention => {
    //   Removes chakra class.
    mention.removeAttribute('class')
    mention.classList.add(MentionBlotClassName, MentionBlotStylingClasses)
  })
}
