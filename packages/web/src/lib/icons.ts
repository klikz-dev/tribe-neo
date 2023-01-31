import * as CalendarIconOutline from '@heroicons/react/outline/CalendarIcon'
import * as EmojiHappyIconOutline from '@heroicons/react/outline/EmojiHappyIcon'
import * as LightBulbIconOutline from '@heroicons/react/outline/LightBulbIcon'
import * as QuestionMarkCircleIconOutline from '@heroicons/react/outline/QuestionMarkCircleIcon'
import * as StarIconOutline from '@heroicons/react/outline/StarIcon'
import * as CalendarIconSolid from '@heroicons/react/solid/CalendarIcon'
import * as EmojiHappyIconSolid from '@heroicons/react/solid/EmojiHappyIcon'
import * as LightBulbIconSolid from '@heroicons/react/solid/LightBulbIcon'
import * as QuestionMarkCircleIconSolid from '@heroicons/react/solid/QuestionMarkCircleIcon'
import * as StarIconSolid from '@heroicons/react/solid/StarIcon'

const mapping = {
  Calendar: { outline: CalendarIconOutline, solid: CalendarIconSolid },
  EmojiHappy: { outline: EmojiHappyIconOutline, solid: EmojiHappyIconSolid },
  Star: { outline: StarIconOutline, solid: StarIconSolid },
  LightBulb: { outline: LightBulbIconOutline, solid: LightBulbIconSolid },
  QuestionMarkCircle: {
    outline: QuestionMarkCircleIconOutline,
    solid: QuestionMarkCircleIconSolid,
  },
}

export function getIcon(name, type = 'outline') {
  if (!mapping[name] || !mapping[name][type]) {
    if (type === 'outline') return QuestionMarkCircleIconOutline
    return QuestionMarkCircleIconSolid
  }
  return mapping[name][type]
}
