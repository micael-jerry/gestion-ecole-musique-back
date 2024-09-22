import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { PrismaService } from '../prisma/prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseInput: CreateCourseInput): Promise<Course> {
    return await this.prismaService.course.create({
      data: createCourseInput,
    });
  }

  async findAll(): Promise<Course[]> {
    return await this.prismaService.course.findMany();
  }

  async findById(id: string): Promise<Course> {
    const course = await this.prismaService.course.findUnique({
      where: { id: id },
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} does not exist`);
    }
    return course;
  }

  async update(updateCourseInput: UpdateCourseInput): Promise<Course> {
    return await this.prismaService.course.update({
      where: { id: updateCourseInput.id },
      data: updateCourseInput,
    });
  }

  async remove(id: string): Promise<Course> {
    return await this.prismaService.course.delete({
      where: { id: id },
    });
  }
}
