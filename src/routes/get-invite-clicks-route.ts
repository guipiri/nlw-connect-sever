import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getInviteClicksBySubscriberId } from '../functions/get-invite-clicks'

export const getInviteClicksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/clicks',
    {
      schema: {
        summary: 'Get invite clicks by subscriber ID',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({ count: z.number() }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      const { count } = await getInviteClicksBySubscriberId({ subscriberId })

      return { count }
    }
  )
}
