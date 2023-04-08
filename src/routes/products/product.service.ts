import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import {
  createProductBodyType,
  productDetailsType,
} from "./lib/product.schema";
import { IProductService } from "./lib/product.interface";

declare module "fastify" {
  interface FastifyInstance {
    productService: IProductService;
  }
}

async function productService(fastify: FastifyInstance): Promise<void> {
  async function createProduct(
    params: createProductBodyType
  ): Promise<productDetailsType> {
    const { name, price, qty } = params;

    return {
      id: "ca0f2d9d-d36a-4019-b72d-2decbc0c43e8",
      name,
      price,
      qty,
      createdAt: new Date().toISOString(),
    };
  }

  fastify.decorate("productService", {
    createProduct,
  });
}

export default fp(productService);
