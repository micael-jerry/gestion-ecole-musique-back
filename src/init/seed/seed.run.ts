import { PrismaService } from '../../prisma/prisma.service';
import { SeedService } from './seed.service';

async function main() {
  const prismaService = new PrismaService();
  const seedService = new SeedService(prismaService);

  await seedService.seederAction();
  await seedService.seederRole();
  await prismaService.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
