import { PrismaClient } from "@prisma/client";

const _prisma = new PrismaClient();

async function main() {
  const user = await _prisma.user.create({ data: { name: "John Doe" } });
  console.log(user);
    // console.log(Object.keys(_prisma))

}
main().then(() => {
  _prisma.$disconnect();
}).catch((e) => {
    console.error(e);
    _prisma.$disconnect();
});

export default _prisma;
