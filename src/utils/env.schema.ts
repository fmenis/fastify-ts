import { ENV } from "../common/enum";
// import S from "fluent-json-schema";

// export function sEnv(): object {
//   return S.object()
//     .additionalProperties(false)
//     .prop(
//       "NODE_ENV",
//       S.string()
//         .enum([ENV.LOCAL, ENV.DEVELOPMENT, ENV.STAGING, ENV.PRODUCTION])
//         .required()
//     )
//     .prop("SERVER_ADDRESS", S.string().default("127.0.0.1"))
//     .required()
//     .prop("SERVER_PORT", S.string().default("3000"))
//     .prop(
//       "LOG_LEVEL",
//       S.string().enum(["debug", "info", "warn", "error", "fatal"])
//       // .default("info")
//     )
//     .valueOf();
// }

import { Static, Type } from "@sinclair/typebox";

function StringEnum<T extends string[]>(values: [...T]) {
  return Type.Unsafe<T[number]>({ type: "string", enum: values });
}

export const configSchema = Type.Object(
  {
    NODE_ENV: StringEnum([
      ENV.LOCAL,
      ENV.DEVELOPMENT,
      ENV.STAGING,
      ENV.PRODUCTION,
    ]),
    SERVER_ADDRESS: Type.String({ default: "127.0.0.1" }),
    SERVER_PORT: Type.Number({ default: 3000 }),
    LOG_LEVEL: StringEnum(["info", "debug"]),
  },
  { additionalProperties: false }
);
export type ConfigSchemaType = Static<typeof configSchema>;
