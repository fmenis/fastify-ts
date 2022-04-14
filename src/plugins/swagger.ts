import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { readFileSync } from "fs";
import { join, resolve } from "path";
import swagger from "fastify-swagger";

const { version } = JSON.parse(
  readFileSync(join(resolve(), "package.json"), "utf8")
);

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(swagger, {
    routePrefix: "/doc",
    swagger: {
      info: {
        title: "Fastify Typescript Sample",
        description: "TODO",
        version,
      },
      // externalDocs: {
      //   url: 'https://github.com/fmenis/political-dilemma-service',
      //   description: 'Find more info here',
      // },
      host: "http://localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "misc", description: "Miscellaneous related end-points" }],
    },
    exposeRoute: true,
  });
});
