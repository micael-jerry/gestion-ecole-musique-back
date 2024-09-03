import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PictureService } from '../picture/picture.service';
import { RoleService } from '../role/role.service';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    PictureService,
    RoleService,
  ],
})
export class UserModule {}
