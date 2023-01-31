import { File } from '../../types'

export type FileFields = 'basic' | 'all' | File

export function fileGQLFields() {
  return `
    extension
    id
    name
    size
    url
    downloadUrl
  `
}
