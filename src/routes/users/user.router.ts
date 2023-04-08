import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUserBody, createUserBodyType } from "./lib/user.schema";

export default async function userRouter(fastify: FastifyInstance) {
  const { userController } = fastify;

  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      body: createUserBody,
      response: {
        200: createUserBody,
      },
    },
    handler: async (
      req: FastifyRequest<{ Body: createUserBodyType }>,
      reply: FastifyReply
    ): Promise<createUserBodyType> => {
      const { firstName, age, email } = req.body;

      return userController.createUser({
        firstName,
        age,
        email,
      });
    },
  });

  // fastify.route({
  //   url: "/:id",
  //   method: "GET",
  //   handler: async (req: FastifyRequest, reply: FastifyReply) => {},
  // });
}
