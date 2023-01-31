import { ClientAttachmentErrorHandler } from '../@types'
import {
  createEmojisGQLMutation,
  createFilesGQLMutation,
  createImageGQLMutation,
  embedGQLQuery,
  updateImageGQLMutation,
} from '../graphql'
import {
  CreateEmojiInput,
  CreateImageInput,
  SignedUrl,
  Image,
  Emoji,
  UploadImagesArgs,
  Embed,
  EmbedInput,
  MutationUpdateImageArgs,
  CreateFileInput,
  AttachmentUploadType,
  File,
} from '../types'
import { GraphqlClient } from './graphql.client'

export class MediaClient {
  private client: GraphqlClient

  constructor(client: GraphqlClient) {
    this.client = client
  }

  async embed(variables: EmbedInput): Promise<Embed> {
    const result = await this.client.authorizedRequest<{ embed: Embed }>({
      query: embedGQLQuery(),
      variables,
    })

    return result.embed
  }

  async updateImage(variables: MutationUpdateImageArgs): Promise<Image> {
    const result = await this.client.authorizedRequest<{ updateImage: Image }>({
      query: updateImageGQLMutation(),
      variables,
    })

    return result.updateImage
  }

  async createEmojis(input: CreateEmojiInput[]): Promise<Array<Emoji>> {
    type QueryResult = { createEmojis: Array<Emoji> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createEmojisGQLMutation(),
      variables: {
        input,
      },
    })

    return result?.createEmojis
  }

  async createImages(variables: CreateImageInput[]): Promise<Array<SignedUrl>> {
    type QueryResult = { createImages: Array<SignedUrl> }
    const result = await this.client.authorizedRequest<QueryResult>({
      query: createImageGQLMutation(),
      variables: {
        input: variables,
      },
    })

    return result?.createImages
  }

  async createFiles(variables: CreateFileInput[]): Promise<Array<SignedUrl>> {
    type QueryResult = { createFiles: Array<SignedUrl> }

    const result = await this.client.authorizedRequest<QueryResult>({
      query: createFilesGQLMutation(),
      variables: {
        input: variables,
      },
    })

    return result?.createFiles
  }

  async uploadFiles(
    input: AttachmentUploadType,
    handleError?: ClientAttachmentErrorHandler,
  ): Promise<File[]> {
    const signedUrls = await this.createFiles(
      input.map(({ file: _, ...input }) => input),
    )

    const output: File[] = []

    const promises = signedUrls.map((signedUrl, index) => {
      const { file, name, size, extension } = input[index]
      const formData = new FormData()
      const parsedFields = JSON.parse(signedUrl.fields)
      // The order of appended key-value into the formData matters.
      Object.entries(parsedFields).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
      formData.append('Content-Type', file.type)
      formData.append('file', file)

      return fetch(signedUrl.signedUrl, {
        method: 'POST',
        body: formData,
      })
        .then(() => {
          output.push({
            id: signedUrl.mediaId,
            url: signedUrl.mediaUrl,
            name,
            downloadUrl: signedUrl.mediaDownloadUrl,
            size,
            extension,
          })
        })
        .catch(e => {
          if (handleError) {
            handleError({
              fileName: name,
              message: e?.message,
            })
          } else {
            throw e
          }
        })
    })

    await Promise.all(promises)

    return output
  }

  async uploadImages(input: UploadImagesArgs[]): Promise<Array<Image>> {
    const output: Image[] = []
    const signedUrls = await this.createImages(
      input.map(({ file, ...rest }) => ({
        contentType: file.type,
        ...rest,
      })),
    )

    const promises = signedUrls.map((signedUrl, index) => {
      const { file } = input[index]
      const formData = new FormData()
      const parsedFields = JSON.parse(signedUrl.fields)
      // The order of appended key-value into the formData matters.
      Object.entries(parsedFields).forEach(([key, value]) => {
        formData.append(key, String(value))
      })
      formData.append('Content-Type', file.type)
      formData.append('file', file)

      return fetch(signedUrl.signedUrl, {
        method: 'POST',
        body: formData,
      })
        .then(r => r.text())
        .then(() => {
          output.push({
            id: signedUrl.mediaId,
            url: signedUrl.mediaUrl,
            urls: signedUrl.urls,
            cropX: input[index].cropX,
            cropY: input[index].cropY,
            cropZoom: input[index].cropZoom,
            name: input[index].name,
            cropHeight: input[index].cropHeight,
            cropWidth: input[index].cropWidth,
            downloadUrl: signedUrl.mediaDownloadUrl,
          })
        })
        .catch(e => {
          console.debug({ e })
        })
    })

    await Promise.all(promises.filter(Boolean))

    return output
  }
}
