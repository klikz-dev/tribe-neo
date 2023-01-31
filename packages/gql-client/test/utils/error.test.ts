import { flattenErrors } from '../../src/utils/error'

describe('flattenErrors', () => {
  it('should preserve flat message', async () => {
    expect(
      flattenErrors([
        {
          message: 'Unauthorized',
          code: '108',
          timestamp: '2021-12-09T10:01:27.524Z',
          help: 'https://developers.tribe.so/',
        },
      ]),
    ).toStrictEqual([
      {
        message: 'Unauthorized',
        code: '108',
        subcode: undefined,
        field: undefined,
        timestamp: '2021-12-09T10:01:27.524Z',
        help: 'https://developers.tribe.so/',
      },
    ])
  })

  it('should flatten nested error', async () => {
    expect(
      flattenErrors([
        {
          message: 'Validation Params Failed',
          code: '100',
          timestamp: '2021-12-09T09:29:43.476Z',
          help: 'https://developers.tribe.so/',
          errors: [
            {
              subcode: 106,
              message: 'email must be an email',
              field: 'email',
            },
          ],
        },
      ]),
    ).toStrictEqual([
      {
        code: undefined,
        field: 'email',
        help: undefined,
        message: 'email must be an email',
        subcode: 106,
        timestamp: undefined,
      },
    ])
  })

  it('should flatten multiple nested errors', async () => {
    expect(
      flattenErrors([
        {
          message: 'Validation Params Failed',
          code: '100',
          timestamp: '2021-12-09T09:48:15.002Z',
          help: 'https://developers.tribe.so/',
          errors: [
            {
              subcode: 106,
              message:
                'usernameOrEmail must be longer than or equal to 3 characters',
              field: 'usernameOrEmail',
            },
            {
              subcode: 106,
              message: 'password must be longer than or equal to 3 characters',
              field: 'password',
            },
          ],
        },
      ]),
    ).toStrictEqual([
      {
        code: undefined,
        field: 'usernameOrEmail',
        help: undefined,
        message: 'usernameOrEmail must be longer than or equal to 3 characters',
        subcode: 106,
        timestamp: undefined,
      },
      {
        code: undefined,
        field: 'password',
        help: undefined,
        message: 'password must be longer than or equal to 3 characters',
        subcode: 106,
        timestamp: undefined,
      },
    ])
  })
})
