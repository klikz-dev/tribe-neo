import { capitalize } from '../../utils/string'

export const guessNameFromEmail = (email: string) => {
  let [parsedName] = email.split('@')
  parsedName = parsedName
    .split(/[^a-zA-Z]+/g)
    .map(capitalize)
    .join(' ')
    .trim()
  return parsedName
}
