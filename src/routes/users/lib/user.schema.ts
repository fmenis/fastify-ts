import { Static, Type } from "@sinclair/typebox";

export const createUserBody = Type.Object(
  {
    firstName: Type.String({ minLength: 3, description: "User first name" }),
    email: Type.String({ format: "email", description: "User email" }),
    age: Type.Integer({ minimum: 18, description: "User email" }),
  },
  { additionalProperties: false }
);
export type createUserBodyType = Static<typeof createUserBody>;
