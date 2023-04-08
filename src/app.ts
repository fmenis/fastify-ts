import { FastifyInstance /*, FastifyRegisterOptions*/ } from "fastify";
import Env from "@fastify/env";

import { sEnv } from "./utils/env.schema";
import apiPlugin from "./routes/index";
import swaggerPlugin from "./plugins/swagger.plugin";

// declare module "fastify" {
//   interface FastifyInstance {
//     massive: any;
//   }
//   interface FastifyRequest {
//     resource: object;
//   }
// }

export default async function app(
  fastify: FastifyInstance
  // opts: any
): Promise<void> {
  await fastify.register(Env, {
    schema: sEnv(),
  });

  await fastify.register(swaggerPlugin);
  await fastify.register(apiPlugin, { prefix: "/api" });
}
