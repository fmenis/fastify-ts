const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.create({
    data: {
      name: "Phil",
    },
  });

  console.log(user);
}

run()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    process.exit(0);
  });
