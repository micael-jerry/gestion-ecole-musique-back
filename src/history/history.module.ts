import { Global, Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryResolver } from './history.resolver';

@Global()
@Module({
  providers: [HistoryResolver, HistoryService, PrismaService],
  exports: [HistoryService],
})
export class HistoryModule {}
