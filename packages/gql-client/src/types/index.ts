import { CreateFileInput, CreateImageInput } from './tribe-graphql.generated'

export * from './tribe-graphql.generated'
export * from './fields'

export type UploadImagesArgs = Omit<CreateImageInput, 'contentType'> & {
  contentType?: string
  file: File
}

export type AttachmentUploadType = Array<
  CreateFileInput & {
    file: File
  }
>
