import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import {
  createProductBodyType,
  productDetailsType,
} from "./lib/product.schema";

declare module "fastify" {
  interface FastifyInstance {
    productService: {
      createProduct(params: createProductBodyType): Promise<productDetailsType>;
      getProduct(params: { id: string }): Promise<productDetailsType>;
    };
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

  async function getProduct(params: {
    id: string;
  }): Promise<productDetailsType> {
    const { id } = params;

    return {
      id,
      name: "Coffie maker",
      qty: 32,
      price: 20,
      createdAt: "2023-04-08T10:44:33.226Z",
    };
  }

  fastify.decorate("productService", {
    createProduct,
    getProduct,
  });
}

export default fp(productService);
