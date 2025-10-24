import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const pw = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { username: "admin", email: "admin@example.com", password: pw, role: "admin" }
  });
  await prisma.user.upsert({
    where: { email: "support@example.com" },
    update: {},
    create: { username: "support", email: "support@example.com", password: pw, role: "support" }
  });
  console.log("Seeded admin and support users.");
}

main().finally(()=>prisma.$disconnect());
