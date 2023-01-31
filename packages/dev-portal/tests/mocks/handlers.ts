import { graphql } from 'msw'

import { app, network } from '../factory'

export const handlers = [
  graphql.query('GlobalApps', (req, res, ctx) => {
    const app1 = app({
      name: 'App 1',
      description: 'App 1 description',
    })
    const app2 = app({
      name: 'App 2',
      description: 'App 2 description',
    })

    return res(
      ctx.data({
        globalApps: {
          totalCount: 2,
          nodes: [app1, app2],
        },
      }),
    )
  }),
  graphql.query('GlobalApp', (req, res, ctx) => {
    const app1 = app({
      name: 'App 1',
      description: 'App 1 description',
    })

    return res(
      ctx.data({
        globalApp: {
          ...app1,
        },
      }),
    )
  }),
  graphql.query('GlobalNetworks', (req, res, ctx) => {
    const network1 = network({
      name: 'Network 1',
    })
    const network2 = network({
      name: 'Network 2',
    })

    return res(
      ctx.data({
        globalNetworks: {
          totalCount: 2,
          nodes: [network1, network2],
        },
      }),
    )
  }),
]
