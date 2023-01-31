import {
  Post,
  PostMappingField,
  PostMappingTypeEnum,
} from '@tribeplatform/gql-client/types'

export const getIdFromAddress = address => {
  const parts = address.match(/[a-zA-Z0-9]+$/)
  if (!parts.length) return null
  return parts[0]
}

export const createPostAddress = (
  spaceSlug: string,
  id: string,
  slug?: string,
) => `/${spaceSlug}/post/${slug ? `${slug}-` : ''}${id}`

export const getPostFields = (
  post: Post,
): Record<string, Record<string, any>> =>
  post?.mappingFields?.reduce((acc, curr) => {
    try {
      return {
        ...acc,
        [curr.key]: { ...curr, value: JSON.parse(curr?.value || '""') },
      }
    } catch (e) {
      return {
        ...acc,
        [curr.key]: curr,
      }
    }
  }, {})

export const getPostFieldValue = (post: Post | null, field: string): string => {
  if (!post) return ''

  const value =
    post?.mappingFields?.find?.(f => f?.key === field)?.value ?? '""'
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

export const getMappingFields = ({
  title,
  content,
  postTypeName,
}: {
  title?: string
  content: string
  postTypeName: string
}): PostMappingField[] => {
  let mappingFields: PostMappingField[]
  switch (postTypeName?.toLowerCase()) {
    case 'discussion':
      mappingFields = generateMappingFieldForDiscussion({
        title,
        content,
      })
      break
    case 'comment':
      mappingFields = generateMappingFieldForComment({
        content,
      })
      break
    case 'question':
      mappingFields = generateMappingFieldForQuestion({
        title,
        content,
      })
      break
    case 'answer':
      mappingFields = generateMappingFieldForAnswer({
        content,
      })
      break
    default:
      mappingFields = []
      break
  }
  return mappingFields
}

export const generateMappingFieldForDiscussion = ({
  title,
  content,
}: {
  title?: string
  content?: string
}): PostMappingField[] => {
  const output: PostMappingField[] = []
  if (typeof title === 'string') {
    output.push({
      key: 'title',
      type: PostMappingTypeEnum.TEXT,
      value: JSON.stringify(title),
    })
  }

  if (typeof content === 'string') {
    output.push({
      key: 'content',
      type: PostMappingTypeEnum.HTML,
      value: JSON.stringify(content),
    })
  }

  return output
}

export const generateMappingFieldForComment = ({
  content,
}: {
  content?: string
}): PostMappingField[] => {
  const output: PostMappingField[] = []

  if (typeof content === 'string') {
    output.push({
      key: 'content',
      type: PostMappingTypeEnum.HTML,
      value: JSON.stringify(content),
    })
  }

  return output
}

export const generateMappingFieldForQuestion = ({
  title,
  content,
}: {
  title?: string
  content?: string
}): PostMappingField[] => {
  const output: PostMappingField[] = []
  if (typeof title === 'string') {
    output.push({
      key: 'question',
      type: PostMappingTypeEnum.TEXT,
      value: JSON.stringify(title),
    })
  }

  if (typeof content === 'string') {
    output.push({
      key: 'description',
      type: PostMappingTypeEnum.HTML,
      value: JSON.stringify(content),
    })
  }

  return output
}

export const generateMappingFieldForAnswer = ({
  content,
}: {
  content?: string
}): PostMappingField[] => {
  const output: PostMappingField[] = []
  if (typeof content === 'string') {
    output.push({
      key: 'answer',
      type: PostMappingTypeEnum.HTML,
      value: JSON.stringify(content),
    })
  }

  return output
}
