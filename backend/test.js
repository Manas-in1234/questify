import prisma from "./prisma/client.js";

async function main() {
  console.log("✅ Prisma Connected Successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });