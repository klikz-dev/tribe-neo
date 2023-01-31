import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'

import { CustomCodeFields } from './customCode.fields'
import { NetworkFields, networkGQLFields } from './network.fields'
import { TopNavigationFields } from './topNavigation.fields'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function customCodeGQLFields(fields: CustomCodeFields): string {
  return `
    anonymize
    position
    code
  `
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function topNavigationGQLFields(fields: TopNavigationFields): string {
  return `
    enabled
    items {
      link
      openInNewWindow
      text
      type
    }
  `
}

export function getNetworkGQLQuery(fields: NetworkFields): DocumentNode {
  return gql`
    query getNetwork {
      network {
        ${networkGQLFields(fields)}
      }
    }
  `
}

export function updateNetworkGQLQuery(fields: NetworkFields): DocumentNode {
  return gql`
    mutation updateNetwork($input: UpdateNetworkInput!) {
      updateNetwork(input: $input) {
        ${networkGQLFields(fields)}
      }
    }
  `
}
