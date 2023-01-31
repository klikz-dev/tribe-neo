export const equals = (a, b) => {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (typeof a === 'undefined') return true
  if (typeof a === 'function') return false
  if (a == null || b == null) return false

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; ++i) {
      if (!equals(a[i], b[i])) return false
    }
    return true
  }
  if (typeof a === 'object') {
    const aKeys = Object.keys(a).sort()
    const bKeys = Object.keys(b).sort()
    if (aKeys.length !== bKeys.length) return false
    for (let i = 0; i < aKeys.length; i++) {
      if (!equals(a[aKeys[i]], b[bKeys[i]])) return false
    }
    return true
  }
  return false
}
