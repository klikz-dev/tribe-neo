export const getSearchParams = <T extends string>(
  selectedParams: Array<T>,
): Record<T, string> | undefined => {
  if (typeof window === 'undefined') {
    return
  }

  const url = new URL(window.location.href)
  const queryString = url.search
  const urlParams = new URLSearchParams(queryString)
  const params: Record<string, string> = {}

  selectedParams.forEach(selectedParam => {
    params[selectedParam] = urlParams?.get(selectedParam) || ''
  })

  return params
}

export function preventNavigation(event: Event) {
  event.preventDefault()

  event.returnValue = true

  return ''
}

const toDataURL = (url: string) => {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
}

export const downloadFile = async (
  src: string,
  name?: string,
): Promise<void> => {
  try {
    const a = document.createElement('a')
    a.href = await toDataURL(src)
    a.download = name || ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (e) {
    window.open(src, '_blank').focus()
    // eslint-disable-next-line no-console
    console.error('Error while downloading file', e.message)
  }
}
