export const injectHTMLElement = (options: {
  document: Document
  element: HTMLElement
  position?: 'head' | 'body'
}) => {
  const { document, element: e, position = 'head' } = options
  if (
    Array.from(document[position].children).some(
      el => el.outerHTML === e.outerHTML,
    )
  )
    return
  const element = document.createElement(e.tagName)
  element.innerHTML = e.innerHTML
  for (let i = 0; i < e.attributes.length; i++) {
    element.setAttribute(
      e.attributes[i].nodeName,
      e.attributes[i].nodeValue || '',
    )
  }
  // Needs a direct append child call to actually 'execute' the scripts
  // https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0
  document[position].appendChild(element)
}
