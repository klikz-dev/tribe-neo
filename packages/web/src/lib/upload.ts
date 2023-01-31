export const linkToFile = async (link: string): Promise<File> => {
  const url = new URL(link)

  const blob: Blob = await fetch(url?.href, {
    method: 'GET',
  }).then(r => r.blob())

  const fileName = url?.href?.split('/').slice(-1)[0]
  const file = new File([blob], fileName, {
    type: blob.type,
  })

  return file
}
