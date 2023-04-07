import Fastify from "fastify";

import app from "./app";

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

  await fastify.register(app);
  await fastify.ready();

  try {
    await fastify.listen({ port: 3000, host: "127.0.0.1" });

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
