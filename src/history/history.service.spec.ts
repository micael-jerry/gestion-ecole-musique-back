import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EntityType, OperationType } from '@prisma/client';
import {
  CourseOne,
  CourseTwo,
} from '../../test/conf/test-utils/course.test-utils';
import {
  HistoryCourseOne,
  HistoryCourseTwo,
} from '../../test/conf/test-utils/history.test-utils';
import { UserAdminOne } from '../../test/conf/test-utils/user.test-utils';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryInput } from './dto/create-history.input';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            history: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            course: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            setting: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            feeType: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            role: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
        HistoryService,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createHistory', () => {
    it('should create history with valid input data', async () => {
      const historyInput: CreateHistoryInput = {
        entityId: CourseOne.id,
        entityType: EntityType.COURSE,
        operationType: OperationType.CREATE,
        userId: UserAdminOne.id,
      };

      jest.spyOn(service, 'findEntityById').mockResolvedValue(CourseOne);
      jest
        .spyOn(prismaService.history, 'create')
        .mockResolvedValue(HistoryCourseOne);

      const result = await service.create(historyInput, prismaService);

      expect(service.findEntityById).toHaveBeenCalledWith(
        CourseOne.id,
        EntityType.COURSE,
      );
      expect(prismaService.history.create).toHaveBeenCalledWith({
        data: historyInput,
        include: {
          user: { include: { role: true, courses: true, payments: true } },
        },
      });
      expect(result).toEqual({ ...HistoryCourseOne, entity: CourseOne });
    });
  });

  describe('findByIdHistory', () => {
    it('should throw an error when trying to find a history with an invalid ID', async () => {
      const invalidId = 'invalid-id';
      jest.spyOn(prismaService.history, 'findUnique').mockResolvedValue(null);

      await expect(service.findById(invalidId)).rejects.toThrow(
        new NotFoundException(`History ${invalidId} not found`),
      );
    });

    it('should return history when valid id', async () => {
      const historyId = 'valid-id';
      const expectedHistory = HistoryCourseOne;
      const expectedEntity = CourseOne;

      jest
        .spyOn(prismaService.history, 'findUnique')
        .mockResolvedValue(expectedHistory);
      jest.spyOn(service, 'findEntityById').mockResolvedValue(expectedEntity);

      const result = await service.findById(historyId);

      expect(prismaService.history.findUnique).toHaveBeenCalledWith({
        where: { id: historyId },
        include: {
          user: { include: { role: true, courses: true, payments: true } },
        },
      });
      expect(service.findEntityById).toHaveBeenCalledWith(
        expectedHistory.entityId,
        expectedHistory.entityType,
      );
      expect(result).toEqual(expectedHistory);
    });
  });

  describe('findAllHistory', () => {
    it('should return empty array when no history records exist for a specific entity type', async () => {
      const entityType = EntityType.COURSE;
      const expectedHistoryList = [];

      jest
        .spyOn(service, 'findAllByEntityType')
        .mockResolvedValue(expectedHistoryList);
      jest.spyOn(service, 'findAllEntityByEntityType').mockResolvedValue([]);

      const result = await service.findAll(entityType);

      expect(service.findAllByEntityType).toHaveBeenCalledWith(entityType);
      expect(service.findAllEntityByEntityType).toHaveBeenCalledWith(
        entityType,
      );
      expect(result).toEqual(expectedHistoryList);
    });

    it('should return history records when multiple history records exist for a specific entity type', async () => {
      const entityType = EntityType.COURSE;
      const expectedHistoryList = [HistoryCourseOne, HistoryCourseTwo];
      const expectedEntityList = [CourseOne, CourseTwo];

      jest
        .spyOn(service, 'findAllByEntityType')
        .mockResolvedValue(expectedHistoryList);
      jest
        .spyOn(service, 'findAllEntityByEntityType')
        .mockResolvedValue(expectedEntityList);

      const result = await service.findAll(entityType);

      expect(service.findAllByEntityType).toHaveBeenCalledWith(entityType);
      expect(service.findAllEntityByEntityType).toHaveBeenCalledWith(
        entityType,
      );
      expect(result.length).toBe(expectedHistoryList.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toEqual({
          ...expectedHistoryList[i],
          entity: expectedEntityList[i],
        });
      }
    });
  });
});
