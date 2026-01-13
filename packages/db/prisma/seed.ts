import { seedOrganizations } from "./seed/organization.seed";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedOrganizations();
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
