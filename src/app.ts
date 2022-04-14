import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from 'fastify'
import Sensible from 'fastify-sensible'
import Helmet from 'fastify-helmet'
import Cors from 'fastify-cors'
import Env from 'fastify-env'

import { sEnv } from './common/schemas/env'
import swaggerPlugin from './plugins/swagger'
import apiPlugin from './routes/index'

const app: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
  fastify.register(Env, {
    data: opts.envData,
    schema: sEnv().valueOf(),
  })

  fastify.register(Sensible)
  fastify.register(Helmet, {
    contentSecurityPolicy: {
      // helmet + swagger configs
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  })

  fastify.register(Cors, {
    origin: true,
    credentials: true,
  })

  fastify.register(swaggerPlugin)
  fastify.register(apiPlugin, { prefix: '/api' })
}

export default app
