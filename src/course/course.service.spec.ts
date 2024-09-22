import { Course, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseService } from './course.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: {
            course: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = module.get<PrismaService>(PrismaService);
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
        ...createCourseInput,
      };
      jest.spyOn(prisma.course, 'create').mockResolvedValue(result);

      const course = await service.create(createCourseInput);

      expect(course).toEqual(result);
      expect(prisma.course.create).toHaveBeenCalledWith({
        data: createCourseInput,
      });
    });
  });

  describe('findAllCourse', () => {
    it('should return an array of course', async () => {
      const result: Course[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          name: 'course',
          description: 'course description',
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
      };
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValue(result);

      const course = await service.findById(
        '0cdd1713-d391-451c-b60b-0ecefb22c049',
      );
      expect(course).toEqual(result);
      expect(prisma.course.findUnique).toHaveBeenCalled();
    });

    it('should return null if no course is found by ID', async () => {
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
        where: { id },
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

      const result: Course = { ...updateCourseInput };

      jest.spyOn(prisma.course, 'update').mockResolvedValue(result);

      const updatedCourse = await service.update(updateCourseInput);
      expect(updatedCourse).toEqual(result);
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: { id: updateCourseInput.id },
        data: updateCourseInput,
      });
    });

    it('should throw an error if the course does not exist', async () => {
      const updateCourseInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Course',
        description: 'Course description',
      };

      jest
        .spyOn(prisma.course, 'update')
        .mockRejectedValue(new Error('Course not found'));

      await expect(service.update(updateCourseInput)).rejects.toThrow(
        'Course not found',
      );
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: { id: updateCourseInput.id },
        data: updateCourseInput,
      });
    });
  });

  describe('deleteCourse', () => {
    it('should delete and return the course deleted', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      const result: Course = {
        id,
        name: 'delete course',
        description: 'delete course description',
      };

      jest.spyOn(prisma.course, 'delete').mockResolvedValue(result);

      const deleteCourse = await service.remove(id);
      expect(deleteCourse).toEqual(result);
      expect(prisma.course.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return not found exception if no course is found ', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.course, 'delete')
        .mockRejectedValue(
          new NotFoundException(`Course with id ${id} does not exist`),
        );

      await expect(service.remove(id)).rejects.toThrow(
        `Course with id ${id} does not exist`,
      );
      expect(prisma.course.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
