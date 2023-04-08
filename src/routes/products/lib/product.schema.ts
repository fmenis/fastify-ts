import { Static, Type } from "@sinclair/typebox";

export const createProductBody = Type.Object(
  {
    name: Type.String({ minLength: 3, description: "Product name" }),
    qty: Type.Integer({ minimum: 1, description: "Product quantity." }),
    price: Type.Integer({ minimum: 18, description: "Product price" }),
  },
  { additionalProperties: false }
);
export type createProductBodyType = Static<typeof createProductBody>;

export const productDetails = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    name: Type.String({ minLength: 3, description: "Product name" }),
    qty: Type.Integer({ minimum: 1, description: "Product quantity." }),
    price: Type.Integer({ minimum: 18, description: "Product price" }),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false }
);
export type productDetailsType = Static<typeof productDetails>;
