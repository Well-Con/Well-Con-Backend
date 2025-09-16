import { PrismaClient } from "@prisma/client";

const _prisma = new PrismaClient();

async function main() {
  // const user = await _prisma.user.create({ data: { name: "John Doe", email: "john.doe@example.com" } });
  // console.log(user);
  console.log("Prisma Client is connected and ready.");
    // console.log(Object.keys(_prisma))

}
main().then(() => {
  _prisma.$disconnect();
}).catch((e) => {
    console.error(e);
    _prisma.$disconnect();
});

export default _prisma;
