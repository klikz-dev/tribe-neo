import { useCallback } from 'react'

// import { useQuery, ApolloQueryResult } from '@apollo/client'
// import { EmbedQuery, EmbedQueryVariables, EMBED } from 'tribe-api/graphql'

export const useEmbed = (): {
  // embed: (url: string) => Promise<ApolloQueryResult<EmbedQuery>>
  embed: (url: string) => Promise<any>
} => {
  // const { refetch } = useQuery<EmbedQuery, EmbedQueryVariables>(EMBED, {
  //   fetchPolicy: 'network-only',
  //   skip: true,
  //   variables: {
  //     url: '',
  //   },
  // })

  const embed = useCallback(
    (url: string) => {
      return new Promise(() => ({
        html: '<h1>aaa</h1>',
        url,
      }))
      // return refetch({
      //   options: JSON.stringify({
      //     iframe: '1',
      //     omit_script: '1',
      //   }),
      //   url,
      // })
    },
    // [refetch],
    [],
  )

  return {
    embed,
  }
}
