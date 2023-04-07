import { FastifyInstance /*, FastifyRegisterOptions*/ } from "fastify";
import Env from "@fastify/env";

import { sEnv } from "./utils/env.schema";

// import swaggerPlugin from "./plugins/swagger.plugin";
import apiPlugin from "./routes/index";
import swaggerPlugin from "./plugins/swagger.plugin";
// import { sEnv } from "./utils/env.schema";

// declare module "fastify" {
//   interface FastifyInstance {
//     massive: any;
//   }
//   interface FastifyRequest {
//     resource: object;
//   }
// }

export default async function app(
  fastify: FastifyInstance,
  opts: any
): Promise<void> {
  await fastify.register(Env, {
    schema: sEnv(),
  });

  fastify.register(swaggerPlugin);

  // fastify.register(swaggerPlugin);

  fastify.register(apiPlugin, { prefix: "/api" });
}
