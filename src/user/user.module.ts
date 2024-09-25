import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { PictureService } from 'src/picture/picture.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    RoleService,
    PictureService,
  ],
  exports: [UserService],
})
export class UserModule {}
