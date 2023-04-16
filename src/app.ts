import { FastifyInstance /*, FastifyRegisterOptions*/ } from "fastify";

import apiPlugin from "./routes/index";
import swaggerPlugin from "./plugins/swagger.plugin";
import prismaPlugin from "./plugins/prisma.plugin";

export default async function app(
  fastify: FastifyInstance
  // opts: any
): Promise<void> {
  await fastify.register(swaggerPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(apiPlugin, { prefix: "/api" });
}
