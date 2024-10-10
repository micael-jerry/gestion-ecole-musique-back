import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { CourseMapper } from './course.mapper';

@Module({
  providers: [CourseResolver, CourseService, PrismaService, CourseMapper],
})
export class CourseModule {}
