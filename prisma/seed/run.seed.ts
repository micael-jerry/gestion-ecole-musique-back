import { PrismaService } from '../../src/prisma/prisma.service';
import { SeedService } from '../../src/seed/seed.service';

async function main() {
  const prismaService = new PrismaService();
  const seedService = new SeedService(prismaService);

  await seedService.seedAction();
  await seedService.seedRole();
  await prismaService.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
