import { FastifyInstance } from "fastify";
import createProduct from "./create";
import productService from "./product.service";

export default async function index(fastify: FastifyInstance): Promise<void> {
  fastify.addHook("onRoute", (options) => {
    options.schema = {
      ...options.schema,
      tags: ["products"],
    };
  });

  await fastify.register(productService);

  const prefix = "/v1/products";
  fastify.register(createProduct, { prefix });
}
