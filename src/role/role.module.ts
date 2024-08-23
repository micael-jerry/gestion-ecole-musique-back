import { Module } from '@nestjs/common';
import { ActionModule } from 'src/action/action.module';
import { ActionService } from 'src/action/action.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [PrismaModule, ActionModule],
  providers: [RoleService, RoleResolver, PrismaService, ActionService],
})
export class RoleModule {}
