import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ActionResolver } from './action.resolver';
import { ActionService } from './action.service';

@Module({
  imports: [PrismaModule],
  providers: [ActionService, ActionResolver, PrismaService],
})
export class ActionModule {}
