import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create users with doctor role
  await prisma.doctor.create({
  data: {
    expertise: ["Cardiology", "Internal Medicine"],
    education: ["MBBS", "MD"],
    registrationNo: "DOC12345",
    consultationTypes: ["Online", "InPerson"],
    consultationFee: [1000, 1200],
    user: {
      create: {
        name: "Dr. Meera Sharma",
        email: "meera.sharma@example.com",
        password: "hashedpassword321",
        role: Role.DOCTOR,
        age: 40,
        phoneNo: "9876543213",
        gender: "Female",
      }
    }
  }
})

  console.log(`doctors created`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    return prisma.$disconnect()
  })
