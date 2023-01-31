/**
 * Returns values from `array`. if element with same key exists in `second`, returns element from second instead
 */
export const pickIfExists = <T>(array: T[], second: T[], key: keyof T): T[] => {
  return array.map(it => second.find(sm => sm[key] === it[key]) || it)
}
