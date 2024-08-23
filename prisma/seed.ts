import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma/prisma.service';
import { SeedService } from '../src/seed/seed.service';

const prisma = new PrismaClient();

async function main() {
  const prismaService = new PrismaService();
  const seedService = new SeedService(prismaService);

  await seedService.seedAction();
  await seedService.seedRole();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
