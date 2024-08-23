import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SeedService } from './seed.service';

@Module({
  imports: [PrismaModule],
  providers: [SeedService, PrismaService],
})
export class SeedModule {}
