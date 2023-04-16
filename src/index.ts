import Fastify from "fastify";
import Env from "@fastify/env";

import { configSchema, ConfigSchemaType } from "./utils/env.schema";
import app from "./app";

declare module "fastify" {
  interface FastifyInstance {
    config: ConfigSchemaType;
  }
}

async function run() {
  const fastify = Fastify({
    logger: {
      level: "debug",
    },
    ajv: {
      customOptions: {
        allErrors: true,
      },
    },
  });

  await fastify.register(Env, {
    schema: configSchema,
  });

  await fastify.register(app);
  await fastify.ready();

  try {
    await fastify.listen({
      port: fastify.config.SERVER_PORT,
      host: fastify.config.SERVER_ADDRESS,
    });

    fastify.log.debug(
      `Server launched in '${process.env.NODE_ENV}' environment`
    );
  } catch (error) {
    fastify.log.fatal(error);
    process.exit(1);
  }
}

run();

/**
 * ##TODO
 * - capire configurazione per top level await
 */
