import clsx from 'clsx'

import { ComposerModuleName, Mention } from '../@types'
import { MentionBlotClassName, MentionBlotStylingClasses } from '../constants'

type ComposerMentionProps = Omit<Mention, 'icon'>

export const ComposerMention = ({ id, title }: ComposerMentionProps) => (
  <a
    data-type={ComposerModuleName.Mention}
    data-id={id}
    className={clsx(`${MentionBlotClassName} ${MentionBlotStylingClasses}`)}
  >
    <span>{title}</span>
  </a>
)
