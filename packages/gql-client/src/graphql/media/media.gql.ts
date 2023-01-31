import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { embedGQLFields } from './embed.fields'
import { emojiGQLFields } from './emoji.fields'
import { imageGQLFields } from './image.fields'
import { signedUrlGQLFields } from './signedUrl.fields'

export function embedGQLQuery(): DocumentNode {
  return gql`
    query embed($url: String!, $options: String) {
      embed(input: { url: $url, options: $options }) {
        ${embedGQLFields('basic')}
      }
    }
  `
}

export const createImageGQLMutation = () => gql`
  mutation createImages($input: [CreateImageInput!]!) {
    createImages(input: $input) {
      ${signedUrlGQLFields()}
    }
  }
`

export const createEmojisGQLMutation = () => gql`
  mutation CreateEmojis($input: [CreateEmojiInput!]!) {
    createEmojis(input: $input) {
      ${emojiGQLFields()}
    }
  }
`

export const updateImageGQLMutation = () => gql`
  mutation updateImage($id: String!, $input: UpdateImageInput!) {
    updateImage(id: $id, input: $input) {
      ${imageGQLFields()}
    }
  }
`

export const createFilesGQLMutation = () => gql`
  mutation createFiles($input: [CreateFileInput!]!) {
    createFiles(input: $input) {
      ${signedUrlGQLFields()}
    }
  }
`
