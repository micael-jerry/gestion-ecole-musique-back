import { Module } from '@nestjs/common';
import { FeeTypeService } from './fee-type.service';
import { PrismaService } from '../prisma/prisma.service';
import { FeeTypeResolver } from './fee-type.resolver';

@Module({
  providers: [FeeTypeResolver, FeeTypeService, PrismaService],
})
export class FeeTypeModule {}
