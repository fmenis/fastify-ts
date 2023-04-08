import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  createProductBody,
  createProductBodyType,
  productDetails,
  productDetailsType,
} from "../lib/product.schema";

export default async function createProduct(fastify: FastifyInstance) {
  const { productService } = fastify;

  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      body: createProductBody,
      response: {
        201: productDetails,
      },
    },
    handler: onCreateProduct,
  });

  async function onCreateProduct(
    req: FastifyRequest<{ Body: createProductBodyType }>,
    reply: FastifyReply
  ): Promise<productDetailsType> {
    const { name, price, qty } = req.body;

    const newProduct = await productService.createProduct({ name, price, qty });

    reply.status(201);
    return newProduct;
  }
}
