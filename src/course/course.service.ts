import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { PrismaService } from '../prisma/prisma.service';
import { EntityType, OperationType } from '@prisma/client';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { CourseWithIncluded } from './types/course-with-include.type';

@Injectable()
export class CourseService {
  private static readonly courseInclude = { users: true };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async create(
    createCourseInput: CreateCourseInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<CourseWithIncluded> {
    return await this.prismaService.$transaction(async (tx) => {
      const courseCreated = await tx.course.create({
        data: createCourseInput,
        include: CourseService.courseInclude,
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

  async findAll(): Promise<CourseWithIncluded[]> {
    return await this.prismaService.course.findMany({
      where: { isDeleted: false },
      include: CourseService.courseInclude,
    });
  }

  async findById(id: string): Promise<CourseWithIncluded> {
    const course = await this.prismaService.course.findUnique({
      where: { id: id, isDeleted: false },
      include: CourseService.courseInclude,
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} does not exist`);
    }
    return course;
  }

  async update(
    updateCourseInput: UpdateCourseInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<CourseWithIncluded> {
    await this.findById(updateCourseInput.id);
    return await this.prismaService.$transaction(async (tx) => {
      const courseUpdated = await tx.course.update({
        where: { id: updateCourseInput.id, isDeleted: false },
        data: updateCourseInput,
        include: CourseService.courseInclude,
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

  async remove(
    id: string,
    authenticatedUser: JwtPayloadType,
  ): Promise<CourseWithIncluded> {
    const course = await this.findById(id);
    if (course.users.length > 0) {
      throw new BadRequestException(
        `This course with id ${id} is linked with several users`,
      );
    }

    return await this.prismaService.$transaction(async (tx) => {
      const courseRemoved = await tx.course.update({
        where: { id: id, isDeleted: false },
        data: { isDeleted: true },
        include: CourseService.courseInclude,
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
