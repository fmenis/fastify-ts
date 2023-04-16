import Fastify, { FastifyInstance } from "fastify";
import * as tap from "tap";
import * as dotenv from "dotenv";
dotenv.config({ path: "test/.env" });

import App from "../../src/app";

export type Test = typeof tap["Test"]["prototype"];

export async function build(t: Test): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      level: "debug",
    },
  });

  await fastify.register(App);
  await fastify.ready();

  t.teardown(async () => {
    fastify.close();
  });

  return fastify;
}
