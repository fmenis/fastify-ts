import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import S from "fluent-json-schema";
import { join, resolve } from "path";
import { readFileSync } from "fs";

const { version } = JSON.parse(
  readFileSync(join(resolve(), "package.json"), "utf8")
);

const status: FastifyPluginAsync = async (
  fastify: FastifyInstance
): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/status",
    schema: {
      summary: "Get application status and version",
      description: "Returns status and version of the server.",
      response: {
        200: S.object()
          .prop("status", S.string())
          .description("Status.")
          .required()
          .prop("version", S.string())
          .description("Server version.")
          .required(),
      },
    },
    handler: async function (
      req: FastifyRequest,
      reply: FastifyReply
    ): Promise<Object> {
      return { status: "ok", version };
    },
  });
};

export default status;
