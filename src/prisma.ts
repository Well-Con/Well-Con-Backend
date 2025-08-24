import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({ data: { name: "John Doe" } });
  console.log(user);
    // console.log(Object.keys(prisma))

}
main().then(() => {
  prisma.$disconnect();
}).catch((e) => {
    console.error(e);
    prisma.$disconnect();
});

export default prisma;
