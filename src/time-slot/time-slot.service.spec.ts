import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TimeSlotStatus } from '@prisma/client';
import {
  TeacherOneTimeSlotOne,
  TeacherOneTimeSlotTwo,
} from '../../test/conf/test-utils/time-slot.test-utils';
import { UserTeacherOne } from '../../test/conf/test-utils/user.test-utils';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeSlotInput } from './dto/create-time-slot.input';
import { UpdateTimeSlotInput } from './dto/update-time-slot.input';
import { TimeSlotService } from './time.slot.service';
import { TimeSlotWithIncluded } from './types/time-slot-with-included.type';
import { getTimeSlotCreateInputList } from './utils/time-slot.util';
import { TimeSlotValidator } from './validator/time-slot.validator';

describe('TimeSlotService', () => {
  let prismaService: PrismaService;
  let timeSlotValidator: TimeSlotValidator;
  let historyService: HistoryService;
  let service: TimeSlotService;
  const INCLUDE = {
    teacher: {
      include: {
        role: true,
        courses: true,
        payments: true,
        timeSlots: true,
      },
    },
  };
  const JWT_PAYLOAD: JwtPayloadType = {
    userId: 'userId',
    roleName: 'roleName',
    actionTags: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            timeSlot: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              createManyAndReturn: jest.fn(),
            },
          },
        },
        {
          provide: TimeSlotValidator,
          useValue: {
            createTimeSloteValidate: jest.fn(),
            validateTimeSlotCreateInputList: jest.fn(),
            updateTimeSlotValidate: jest.fn(),
            validateTimeSlotUpdateInputList: jest.fn(),
          },
        },
        {
          provide: HistoryService,
          useValue: { createMany: jest.fn(), create: jest.fn() },
        },
        TimeSlotService,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    timeSlotValidator = module.get<TimeSlotValidator>(TimeSlotValidator);
    historyService = module.get<HistoryService>(HistoryService);
    service = module.get<TimeSlotService>(TimeSlotService);
  });

  describe('findAllTimeSlot', () => {
    it('should return an empty array when no time slots match the search criteria', async () => {
      // Arrange
      const expectedResult: TimeSlotWithIncluded[] = [];
      const startDate = new Date('2022-01-01');
      const endDate = new Date('2022-01-02');

      jest.spyOn(prismaService.timeSlot, 'findMany').mockResolvedValue([]);

      // Act
      const result = await service.findAll(
        undefined,
        undefined,
        startDate,
        endDate,
      );

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should filter time slots by teacherId when provided', async () => {
      // Arrange
      const expectedResult: TimeSlotWithIncluded[] = [TeacherOneTimeSlotOne];
      const teacherId = UserTeacherOne.id;

      jest
        .spyOn(prismaService.timeSlot, 'findMany')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await service.findAll(teacherId);

      // Assert
      expect(prismaService.timeSlot.findMany).toHaveBeenCalledWith({
        where: {
          teacherId,
          status: undefined,
          start: undefined,
          end: undefined,
        },
        orderBy: { start: 'asc' },
        include: INCLUDE,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return a list of time slots if no args are provided', async () => {
      // Arrange
      const expectedResult: TimeSlotWithIncluded[] = [
        // Add expected time slot objects here
      ];

      jest
        .spyOn(prismaService.timeSlot, 'findMany')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await service.findAll();

      // Assert
      expect(prismaService.timeSlot.findMany).toHaveBeenCalledWith({
        where: {
          teacherId: undefined,
          status: undefined,
          start: undefined,
          end: undefined,
        },
        orderBy: { start: 'asc' },
        include: INCLUDE,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findByIdTimeSlot', () => {
    it('should throw an error when finding a time slot with an invalid ID', async () => {
      // Arrange
      const invalidId = 'invalid-id';
      jest.spyOn(prismaService.timeSlot, 'findUnique').mockResolvedValue(null);

      // Act
      const findById = async () => await service.findById(invalidId);

      // Assert
      await expect(findById).rejects.toThrow(
        new NotFoundException(`Time slot with id ${invalidId} does not exist`),
      );
    });

    it('should return the correct time slot when finding by ID', async () => {
      // Arrange
      const expectedResult: TimeSlotWithIncluded = TeacherOneTimeSlotOne;
      const id = TeacherOneTimeSlotOne.id;

      jest
        .spyOn(prismaService.timeSlot, 'findUnique')
        .mockResolvedValue(expectedResult);

      // Act
      const result = await service.findById(id);

      // Assert
      expect(prismaService.timeSlot.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: INCLUDE,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createTimeSlot', () => {
    it('should validate and handle invalid create timeslot input', async () => {
      // Arrange
      const invalidCreateTimeSlotInput: CreateTimeSlotInput = {
        teacherId: 'invalidTeacherId',
        times: [{ start: new Date(), end: new Date() }],
      };
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;

      jest
        .spyOn(timeSlotValidator, 'createTimeSloteValidate')
        .mockRejectedValue(new Error('Invalid create time slot input'));

      // Act
      const create = async () =>
        await service.create(invalidCreateTimeSlotInput, authenticatedUser);

      // Assert
      await expect(create).rejects.toThrow('Invalid create time slot input');
      expect(timeSlotValidator.createTimeSloteValidate).toHaveBeenCalledWith(
        invalidCreateTimeSlotInput,
      );
      expect(prismaService.timeSlot.createManyAndReturn).not.toHaveBeenCalled();
      expect(historyService.createMany).not.toHaveBeenCalled();
    });

    it('should create time slot if valid input', async () => {
      // Arrange
      const createTimeSlotInput: CreateTimeSlotInput = {
        teacherId: UserTeacherOne.id,
        times: [
          {
            start: TeacherOneTimeSlotOne.start,
            end: TeacherOneTimeSlotTwo.end,
          },
        ],
      };

      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;
      const expectedResult: TimeSlotWithIncluded[] = [
        TeacherOneTimeSlotOne,
        TeacherOneTimeSlotTwo,
      ];

      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest
        .spyOn(timeSlotValidator, 'createTimeSloteValidate')
        .mockResolvedValue(Promise.resolve());
      jest
        .spyOn(timeSlotValidator, 'validateTimeSlotCreateInputList')
        .mockResolvedValue(Promise.resolve());
      jest
        .spyOn(prismaService.timeSlot, 'createManyAndReturn')
        .mockResolvedValue(expectedResult);
      jest
        .spyOn(historyService, 'createMany')
        .mockResolvedValue(Promise.resolve());

      // Act
      const result = await service.create(
        createTimeSlotInput,
        authenticatedUser,
      );

      // Assert
      expect(timeSlotValidator.createTimeSloteValidate).toHaveBeenCalledWith(
        createTimeSlotInput,
      );
      // TO BE VERIFIED
      // expect(
      //   timeSlotValidator.validateTimeSlotUpdateInputList,
      // ).toHaveBeenCalledWith(getTimeSlotCreateInputList(createTimeSlotInput));
      expect(prismaService.timeSlot.createManyAndReturn).toHaveBeenCalledWith({
        data: getTimeSlotCreateInputList(createTimeSlotInput),
        include: INCLUDE,
      });
      expect(historyService.createMany).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateTimeSlot', () => {
    it('should throw an error when updating a time slot with an invalid ID', async () => {
      const invalidId = 'invalid-id';

      jest.spyOn(prismaService.timeSlot, 'findMany').mockResolvedValue([]);
      jest
        .spyOn(timeSlotValidator, 'updateTimeSlotValidate')
        .mockRejectedValue(new Error('Invalid time slot IDs'));

      await expect(
        service.update(
          [{ id: invalidId, status: TimeSlotStatus.TAKEN }],
          JWT_PAYLOAD,
        ),
      ).rejects.toThrow(new Error('Invalid time slot IDs'));
    });

    it('should update the time slots correctly when the input is valid', async () => {
      // Arrange
      const updateTimeSlotListInput: UpdateTimeSlotInput[] = [
        { id: TeacherOneTimeSlotOne.id, status: TimeSlotStatus.TAKEN },
        { id: TeacherOneTimeSlotTwo.id, status: TimeSlotStatus.CANCELLED },
      ];
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;
      const expectedResult: TimeSlotWithIncluded[] = [
        { ...TeacherOneTimeSlotOne, status: TimeSlotStatus.TAKEN },
        { ...TeacherOneTimeSlotTwo, status: TimeSlotStatus.CANCELLED },
      ];

      jest.spyOn(prismaService.timeSlot, 'findMany').mockResolvedValue(
        updateTimeSlotListInput.map((t) => ({
          ...t,
          ...TeacherOneTimeSlotOne,
        })),
      );
      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation(async (...operations) => {
          return await Promise.all(operations);
        });

      jest
        .spyOn(prismaService.timeSlot, 'update')
        .mockResolvedValueOnce({
          ...TeacherOneTimeSlotOne,
          status: TimeSlotStatus.TAKEN,
        })
        .mockResolvedValueOnce({
          ...TeacherOneTimeSlotTwo,
          status: TimeSlotStatus.CANCELLED,
        });
      jest
        .spyOn(prismaService.timeSlot, 'findMany')
        .mockResolvedValue(expectedResult);
      jest
        .spyOn(historyService, 'createMany')
        .mockResolvedValue(Promise.resolve());
      jest
        .spyOn(timeSlotValidator, 'updateTimeSlotValidate')
        .mockResolvedValue(undefined);

      // Act
      const result = await service.update(
        updateTimeSlotListInput,
        authenticatedUser,
      );

      // Assert
      expect(prismaService.timeSlot.findMany).toHaveBeenCalledWith({
        where: { id: { in: updateTimeSlotListInput.map((t) => t.id) } },
        include: INCLUDE,
        orderBy: { start: 'asc' },
      });
      expect(prismaService.timeSlot.update).toHaveBeenCalledTimes(2);
      expect(prismaService.timeSlot.update).toHaveBeenCalledWith({
        where: { id: TeacherOneTimeSlotOne.id },
        data: { id: TeacherOneTimeSlotOne.id, status: TimeSlotStatus.TAKEN },
      });
      expect(prismaService.timeSlot.update).toHaveBeenCalledWith({
        where: { id: TeacherOneTimeSlotTwo.id },
        data: {
          id: TeacherOneTimeSlotTwo.id,
          status: TimeSlotStatus.CANCELLED,
        },
      });
      expect(historyService.createMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });
});
