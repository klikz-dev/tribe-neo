import scrollIntoView from 'scroll-into-view-if-needed'

export const scrollElementIntoView = (element: HTMLElement): void => {
  if (!element) return
  scrollIntoView(element, {
    behavior: 'auto',
    scrollMode: 'if-needed',
  })
}
