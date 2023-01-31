/* eslint-disable no-console */
export const logger = {
  debug: (...args) => console.debug(...args),
  warn: (...args) => console.warn(...args),
  info: (...args) => console.info(...args),
  error: (...args) => console.error(...args),
}
