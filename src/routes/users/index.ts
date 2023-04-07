import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import createUser from "./create";

async function index(fastify: FastifyInstance) {
  fastify.addHook("onRoute", (options) => {
    options.schema = {
      ...options.schema,
      tags: ["users"],
    };
  });

  const prefix = "/v1/users";
  fastify.register(createUser, { prefix });
}

export default fp(index);
