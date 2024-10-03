import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { PrismaService } from '../prisma/prisma.service';
import { Course, EntityType, OperationType } from '@prisma/client';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async create(
    createCourseInput: CreateCourseInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<Course> {
    return await this.prismaService.$transaction(async (tx) => {
      const courseCreated = await tx.course.create({
        data: createCourseInput,
      });
      await this.historyService.create(
        {
          entityId: courseCreated.id,
          entityType: EntityType.COURSE,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return courseCreated;
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

  async update(
    updateCourseInput: UpdateCourseInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<Course> {
    return await this.prismaService.$transaction(async (tx) => {
      const courseUpdated = await tx.course.update({
        where: { id: updateCourseInput.id },
        data: updateCourseInput,
      });
      await this.historyService.create(
        {
          entityId: courseUpdated.id,
          entityType: EntityType.COURSE,
          operationType: OperationType.UPDATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return courseUpdated;
    });
  }

  async remove(id: string, authenticatedUser: JwtPayloadType): Promise<Course> {
    return await this.prismaService.$transaction(async (tx) => {
      const courseRemoved = await tx.course.delete({
        where: { id: id },
      });
      await this.historyService.create(
        {
          entityId: courseRemoved.id,
          entityType: EntityType.COURSE,
          operationType: OperationType.DELETE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return courseRemoved;
    });
  }
}
