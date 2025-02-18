import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'

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

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
