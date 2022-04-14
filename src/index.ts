import Fastify from 'fastify'
import { FastifyServerOptions } from 'fastify'

import app from './app'

const config: FastifyServerOptions = {
  logger: {
    prettyPrint: process.env.NODE_ENV !== 'production',
    level: process.env.LOG_LEVEL,
  },
  trustProxy: true,
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
}

const fastify = Fastify(config)

fastify.register(app)

const port = process.env.SERVER_PORT || 3000
const address = process.env.SERVER_ADDRESS || '127.0.0.1'

fastify.listen(port, address, (err, address) => {
  if (err) {
    fastify.log.fatal(err)
    process.exit(1)
  }
  fastify.log.debug(`Server launched in '${process.env.NODE_ENV}' environment`)
})

/**
 * ##TODO
 * - capire come usare nodemon + ts per ricompilare ad ogni salvataggio
 * - implementare un struttura decente
 * - impostare linter (eslint)
 * - trovare un boilerplate per il .gitognore
 * - impostare husky
 * - impostare gracefull shutdown
 */
