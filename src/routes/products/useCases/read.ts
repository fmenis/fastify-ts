import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productDetailsType } from "../lib/product.schema";

export default async function readProduct(fastify: FastifyInstance) {
  const { productService } = fastify;

  fastify.route({
    url: "/:id",
    method: "GET",
    // schema: {
    //   body: createProductBody,
    //   response: {
    //     201: productDetails,
    //   },
    // },
    handler: onReadProduct,
  });

  async function onReadProduct(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<productDetailsType> {
    const { id } = req.params;

    const product = await productService.getProduct({ id });
    return product;
  }
}
