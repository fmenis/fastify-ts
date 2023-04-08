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
  const { prisma } = fastify;

  async function createUser(params: createUserBodyType): Promise<any> {
    const { firstName, email } = params;

    // const newUser = await prisma.user.create({
    //   data: {},
    // });

    const newUser = await prisma.user.create({
      data: {
        name: firstName,
        email,
      },
    });

    return {
      ...newUser,
      firstName: newUser.name,
    };
  }

  fastify.decorate("userController", {
    createUser,
  });
}

export default fp(userController);
