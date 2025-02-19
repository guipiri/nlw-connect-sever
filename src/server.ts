import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { getInviteClicksRoute } from './routes/get-invite-clicks-route'
import { getInviteSubscriptionsRoute } from './routes/get-invite-subscriptions-route'
import { gettRankingPositionRoute } from './routes/get-ranking-position-route'
import { getRankingRoute } from './routes/get-ranking-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getInviteClicksRoute)
app.register(getInviteSubscriptionsRoute)
app.register(gettRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
