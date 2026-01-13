import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedOrganizations() {
  console.log("🌱 Seeding organizations...");

  await prisma.organization.createMany({
    data: [
      {
        id: "org_demo",
        name: "Demo Organization",
        slug: "demo-org",
        status: "ACTIVE", // 1
      },
      {
        id: "org_acme",
        name: "Acme Corporation",
        slug: "acme",
        status: "ACTIVE", // 2
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Organizations seeded");
}
