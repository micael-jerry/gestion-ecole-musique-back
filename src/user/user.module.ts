import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { PictureModule } from '../picture/picture.module';

@Module({
  imports: [PictureModule],
  providers: [UserResolver, UserService, PrismaService, RoleService],
  exports: [UserService],
})
export class UserModule {}
