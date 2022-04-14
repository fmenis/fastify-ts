import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";
import Sensible from "fastify-sensible";
import Helmet from "fastify-helmet";
import Cors from "fastify-cors";
import S from "fluent-json-schema";
import Env from "fastify-env";

import swaggerPlugin from "./plugins/swagger";
import apiPlugin from "./routes/index";

const app: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
  fastify.register(Env, {
    data: opts.envData,
    schema: S.object()
      .prop(
        "NODE_ENV",
        S.string().enum(["production", "staging", "development"]).required()
      )
      .prop("SERVER_ADDRESS", S.string().default("127.0.0.1"))
      .prop("SERVER_PORT", S.string().default("3000"))
      .prop("LOG_LEVEL", S.string().required())
      .valueOf(),
  });

  fastify.register(Sensible);
  fastify.register(Helmet, {
    contentSecurityPolicy: {
      // helmet + swagger configs
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  fastify.register(Cors, {
    origin: true,
    credentials: true,
  });

  fastify.register(swaggerPlugin);
  fastify.register(apiPlugin, { prefix: "/api" });
};

export default app;
