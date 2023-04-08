import { FastifyInstance } from "fastify";

import userRouter from "./user.router";
import userController from "./user.controller";

export default async function index(fastify: FastifyInstance): Promise<void> {
  fastify.addHook("onRoute", (options) => {
    options.schema = {
      ...options.schema,
      tags: ["users"],
    };
  });

  fastify.register(userController);

  const prefix = "/v1/users";
  fastify.register(userRouter, { prefix });
}
