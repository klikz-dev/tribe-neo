import { Mutation, Query } from '../types/tribe-graphql.generated'

export interface MutationsAndQueries extends Mutation, Query {
  __typename: never
}

export type ApolloApis = keyof MutationsAndQueries
