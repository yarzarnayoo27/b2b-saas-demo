"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOrganizations = seedOrganizations;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedOrganizations() {
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
