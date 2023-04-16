import { test } from "tap";
import { build } from "./helpers/helper";
import { faker } from "@faker-js/faker";

test("TEST", async (t) => {
  t.plan(2);

  const fastify = await build(t);

  const payload = {
    firstName: faker.name.firstName(),
    email: faker.internet.email().toLocaleLowerCase(),
    age: faker.datatype.number({ min: 18, max: 100 }),
  };

  const res = await fastify.inject({
    method: "POST",
    path: "api/v1/users",
    payload,
  });

  t.match(res.json(), {
    firstName: payload.firstName,
    email: payload.email,
  });
  t.equal(res.statusCode, 200);
});
