import { FastifyPluginAsync, RawServerDefault } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeToEventRoute: FastifyPluginAsync<
  Record<never, never>,
  RawServerDefault,
  ZodTypeProvider
> = async (app) => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to event',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({ name: z.string(), email: z.string().email() }),
        },
      },
    },
    (request, reply) => {
      const { name, email } = request.body

      //Criação da inscrição no banco de dados

      reply.status(201).send({ name, email })
    }
  )
}
