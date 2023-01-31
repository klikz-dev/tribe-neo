import { networkGQLFields } from 'src'

describe('Network GraphQL Fields', () => {
  it('should return correct fields', async () => {
    expect(networkGQLFields('basic')).toMatchSnapshot()
    expect(networkGQLFields('all')).toMatchSnapshot()
    expect(
      networkGQLFields({
        customCode: 'all',
        roles: 'basic',
        defaultSpaces: {
          spaceType: {
            availablePostTypes: {
              validReplyTypes: {
                validReplyTypes: {
                  validReplyTypes: 'basic',
                },
              },
            },
          },
        },
      }),
    ).toMatchSnapshot()
  })
})
