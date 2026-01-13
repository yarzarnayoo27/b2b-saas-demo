"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organization_seed_1 = require("./seed/organization.seed");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await (0, organization_seed_1.seedOrganizations)();
}
main()
    .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
