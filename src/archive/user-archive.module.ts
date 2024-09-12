import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserArchiveResolver } from './user-archive.resolver';
import { UserArchiveService } from './user-archive.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UserModule],
  providers: [UserArchiveResolver, UserArchiveService, PrismaService],
})
export class UserArchiveModule {}
