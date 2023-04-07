import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUserBody, createUserBodyType } from "./lib/user.schema";

export default async function createUser(fastify: FastifyInstance) {
  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      body: createUserBody,
      response: {
        200: createUserBody,
      },
    },
    handler: onCreateUser,
  });

  async function onCreateUser(
    req: FastifyRequest<{ Body: createUserBodyType }>,
    reply: FastifyReply
  ): Promise<createUserBodyType> {
    const { firstName, age, email } = req.body;

    return {
      firstName,
      age,
      email,
    };
  }
}
