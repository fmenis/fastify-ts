import { FastifyInstance, FastifyPluginAsync } from "fastify";

import statusRoute from "./status";

const index: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  fastify.addHook("onRoute", (options) => {
    options.schema = {
      ...options.schema,
      tags: ["misc"],
    };
  });

  fastify.register(statusRoute);
};

export default index;
