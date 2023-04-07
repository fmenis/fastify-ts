import { FastifyInstance } from "fastify";
import userRoutes from "./users/index";

export default async function index(fastify: FastifyInstance): Promise<void> {
  fastify.register(userRoutes);
}
