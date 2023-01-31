export function shallowCompare(a, b) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in b) {
    if (!(key in a) || a[key] !== b[key]) {
      return false
    }
  }
  return true
}
