import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CourseResolver, CourseService, PrismaService],
})
export class CourseModule {}
