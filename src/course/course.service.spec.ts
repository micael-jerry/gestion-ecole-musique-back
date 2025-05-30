import { Course, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseService } from './course.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { CourseWithIncluded } from './types/course-with-include.type';

describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;
  let historyService: HistoryService;
  const JWT_PAYLOAD: JwtPayloadType = {
    userId: 'userId',
    roleName: 'roleName',
    actionTags: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            course: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
        {
          provide: HistoryService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCourse', () => {
    it('should create a new course and return it', async () => {
      const createCourseInput = {
        name: 'course',
        description: 'create course',
      } satisfies Prisma.CourseCreateInput;

      const result: Course = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        isDeleted: false,
        ...createCourseInput,
      };
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.course, 'create').mockResolvedValue(result);

      const course = await service.create(createCourseInput, JWT_PAYLOAD);

      expect(course).toEqual(result);
      expect(prisma.course.create).toHaveBeenCalledWith({
        data: createCourseInput,
        include: { users: true },
      });
      expect(historyService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllCourse', () => {
    it('should return an array of course', async () => {
      const result: Course[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          name: 'course',
          description: 'course description',
          isDeleted: false,
        },
      ];
      jest.spyOn(prisma.course, 'findMany').mockResolvedValue(result);

      const course = await service.findAll();
      expect(course).toEqual(result);
      expect(prisma.course.findMany).toHaveBeenCalled();
    });
  });

  describe('findByIdCourse', () => {
    it('should return a single course by ID', async () => {
      const result: Course = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'course',
        description: 'course description',
        isDeleted: false,
      };
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(result);

      const course = await service.findById(
        '0cdd1713-d391-451c-b60b-0ecefb22c049',
      );
      expect(course).toEqual(result);
      expect(prisma.course.findUnique).toHaveBeenCalled();
    });

    it('should return error if no course is found by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.course, 'findUnique')
        .mockRejectedValue(
          new NotFoundException(`course with ID "${id}" not found`),
        );

      await expect(service.findById(id)).rejects.toThrow(
        `course with ID "${id}" not found`,
      );
      expect(prisma.course.findUnique).toHaveBeenCalledWith({
        where: { id, isDeleted: false },
        include: { users: true },
      });
    });
  });

  describe('updateCourse', () => {
    it('should update and return the course', async () => {
      const updateCourseInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Updated course',
        description: 'Updated course description',
      };

      const result: Course = { ...updateCourseInput, isDeleted: false };

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.course, 'update').mockResolvedValue(result);

      const updatedCourse = await service.update(
        updateCourseInput,
        JWT_PAYLOAD,
      );
      expect(updatedCourse).toEqual(result);
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: { id: updateCourseInput.id, isDeleted: false },
        data: updateCourseInput,
        include: { users: true },
      });
      expect(historyService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the course does not exist', async () => {
      const updateCourseInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Course',
        description: 'Course description',
      };

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest
        .spyOn(prisma.course, 'update')
        .mockRejectedValue(new Error('Course not found'));

      await expect(
        service.update(updateCourseInput, JWT_PAYLOAD),
      ).rejects.toThrow('Course not found');
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: { id: updateCourseInput.id, isDeleted: false },
        data: updateCourseInput,
        include: { users: true },
      });
    });
  });

  describe('deleteCourse', () => {
    it('should delete and return the course deleted', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      const result: CourseWithIncluded = {
        id,
        name: 'delete course',
        description: 'delete course description',
        isDeleted: false,
        users: [],
      };

      jest.spyOn(service, 'findById').mockResolvedValue(result);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.course, 'update').mockResolvedValue(result);

      const deleteCourse = await service.remove(id, JWT_PAYLOAD);
      expect(deleteCourse).toEqual(result);
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: { id, isDeleted: false },
        include: { users: true },
        data: { isDeleted: true },
      });
    });

    it('should return not found exception if no course is found ', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(
          new NotFoundException(`Course with id ${id} does not exist`),
        );

      await expect(service.remove(id, JWT_PAYLOAD)).rejects.toThrow(
        `Course with id ${id} does not exist`,
      );
      expect(prisma.course.delete).not.toHaveBeenCalledWith({
        where: { id },
        include: { users: true },
      });
    });
  });
});
