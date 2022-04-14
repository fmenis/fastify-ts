import { FastifyInstance, FastifyPluginAsync } from "fastify";

import miscRoutes from "./misc/index";

const index: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  fastify.register(miscRoutes);
};

export default index;
