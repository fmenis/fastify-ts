import { FastifyInstance } from "fastify";
import createProduct from "./useCases/create";
import productService from "./product.service";
import readProduct from "./useCases/read";

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
  fastify.register(readProduct, { prefix });
}
