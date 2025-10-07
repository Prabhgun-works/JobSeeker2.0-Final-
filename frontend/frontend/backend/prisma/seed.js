const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@example.com",
        password: "hashed123",
        role: "admin",
      },
      {
        name: "Recruiter1",
        email: "recruiter@example.com",
        password: "hashed123",
        role: "recruiter",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding finished.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });