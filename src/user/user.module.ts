import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { PictureService } from '../picture/picture.service';
import { UserValidator } from './validator/user.validator';
import { UserMapper } from './user.mapper';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    RoleService,
    PictureService,
    UserValidator,
    UserMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
