import { ENV } from "../common/enum";
import S from "fluent-json-schema";

export function sEnv(): object {
  return S.object()
    .additionalProperties(false)
    .prop(
      "NODE_ENV",
      S.string()
        .enum([ENV.LOCAL, ENV.DEVELOPMENT, ENV.STAGING, ENV.PRODUCTION])
        .required()
    )
    .prop("SERVER_ADDRESS", S.string().default("127.0.0.1"))
    .required()
    .prop("SERVER_PORT", S.string().default("3000"))
    .prop(
      "LOG_LEVEL",
      S.string().enum(["debug", "info", "warn", "error", "fatal"])
      // .default("info")
    )
    .valueOf();
}
