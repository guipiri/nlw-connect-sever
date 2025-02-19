import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getInviteSubscriptionsBySubscriberId } from '../functions/get-invite-subscriptions'

export const getInviteSubscriptionsRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    '/subscribers/:subscriberId/ranking/subscriptions',
    {
      schema: {
        summary: 'Get invite subscriptions by subscriber ID',
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

      const { count } = await getInviteSubscriptionsBySubscriberId({
        subscriberId,
      })

      return { count }
    }
  )
}
