import { Module } from '@nestjs/common';
import { ActionModule } from '../action/action.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { RoleMapper } from './role.mapper';

@Module({
  imports: [PrismaModule, ActionModule],
  providers: [RoleService, RoleResolver, PrismaService, RoleMapper],
  exports: [RoleService],
})
export class RoleModule {}
