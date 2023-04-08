import { FastifyInstance } from "fastify";
import userRoutes from "./users/index";
import productRoutes from "./products/index";

export default async function index(fastify: FastifyInstance): Promise<void> {
  fastify.register(userRoutes);
  fastify.register(productRoutes);
}
