import fp from "fastify-plugin";
import { createUserBodyType } from "./lib/user.schema";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    userController: {
      createUser(params: createUserBodyType): Promise<createUserBodyType>;
    };
  }
}

async function userController(fastify: FastifyInstance) {
  async function createUser(
    params: createUserBodyType
  ): Promise<createUserBodyType> {
    const { firstName, age, email } = params;

    return {
      age,
      firstName,
      email,
    };
  }

  fastify.decorate("userController", {
    createUser,
  });
}

export default fp(userController);
