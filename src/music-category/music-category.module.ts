import { Module } from '@nestjs/common';
import { MusicCategoryService } from './music-category.service';
import { MusicCategoryResolver } from './music-category.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MusicCategoryResolver, MusicCategoryService, PrismaService],
})
export class MusicCategoryModule {}
