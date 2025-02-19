import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRankingPositionBySubscriberId } from '../functions/get-ranking-position'

export const gettRankingPositionRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        summary: 'Get ranking position by subscriber ID',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({ position: z.number().nullable() }),
        },
      },
    },
    async (request) => {
      const { subscriberId } = request.params

      const { position } = await getRankingPositionBySubscriberId({
        subscriberId,
      })

      return { position }
    }
  )
}
