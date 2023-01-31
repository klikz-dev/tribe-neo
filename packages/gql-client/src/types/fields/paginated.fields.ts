export type Paginated<T> = 'basic' | 'all' | CustomPaginated<T>

export interface CustomPaginated<T> {
  edges?: {
    cursor?: 'all'
    node?: T
  }
  nodes?: T
  pageInfo?: {
    endCursor?: 'all'
    hasNextPage?: 'all'
  }
  totalCount?: 'all'
}

const BASIC_PAGINATED_FIELDS: CustomPaginated<any> = {}
const ALL_PAGINATED_FIELDS: CustomPaginated<any> = {
  edges: {
    cursor: 'all',
    node: 'all',
  },
  nodes: 'all',
  pageInfo: {
    endCursor: 'all',
    hasNextPage: 'all',
  },
  totalCount: 'all',
}

export function paginatedGQLFields<T>(
  fields: Paginated<T>,
  innerGQLFieldsFn: (fields: T) => string,
) {
  if (fields === 'basic') fields = BASIC_PAGINATED_FIELDS
  if (fields === 'all') fields = ALL_PAGINATED_FIELDS

  return `
  __typename
  ${
    fields.edges
      ? `
    edges {
      ${
        fields.edges.cursor
          ? `
        cursor
      `
          : ``
      }
      ${
        fields.edges.node
          ? `
        node {
          ${innerGQLFieldsFn(fields.edges.node)}
        }
      `
          : ``
      }
    }
  `
      : ``
  }
  ${
    fields.nodes
      ? `
    nodes {
      ${innerGQLFieldsFn(fields.nodes)}
    }
  `
      : ``
  }
  totalCount
  pageInfo {
      endCursor
      hasNextPage
  }
  `
}
