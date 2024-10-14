import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from '../history/history.service';
import { ReservationService } from './reservation.service';
import { ReservationValidator } from './validator/reservation.validator';
import { CreateReservationInput } from './dto/create-reservation.input';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { PrismaService } from '../prisma/prisma.service';
import {
  AllReservation,
  StudentOneReservation,
} from '../../test/conf/test-utils/reservation.test-utils';
import { ReservationStatus, TimeSlotStatus } from '@prisma/client';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { NotFoundException } from '@nestjs/common';

describe('ReservationService', () => {
  let reservationValidator: ReservationValidator;
  let historyService: HistoryService;
  let prismaService: PrismaService;
  let service: ReservationService;

  const INCLUDE = {
    student: {
      include: { role: true, courses: true, payments: true, timeSlots: true },
    },
    timeSlots: true,
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
            reservation: {
              create: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
              updateMany: jest.fn(),
              update: jest.fn(),
            },
            timeSlot: {
              updateMany: jest.fn(),
            },
          },
        },
        {
          provide: ReservationValidator,
          useValue: {
            createReservationValidator: jest.fn(),
          },
        },
        {
          provide: HistoryService,
          useValue: {
            create: jest.fn(),
          },
        },
        ReservationService,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    reservationValidator =
      module.get<ReservationValidator>(ReservationValidator);
    historyService = module.get<HistoryService>(HistoryService);
    service = module.get<ReservationService>(ReservationService);
  });

  describe('createReservation', () => {
    it('should create a reservation with valid inputs', async () => {
      const createReservationInput: CreateReservationInput = {
        studentId: StudentOneReservation.studentId,
        timeSlots: StudentOneReservation.timeSlots.map(({ id }) => ({ id })),
      };
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;

      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest
        .spyOn(reservationValidator, 'createReservationValidator')
        .mockResolvedValue(undefined);
      jest
        .spyOn(prismaService.reservation, 'create')
        .mockResolvedValue(StudentOneReservation);
      jest.spyOn(historyService, 'create').mockResolvedValue(undefined);

      await service.create(createReservationInput, authenticatedUser);

      expect(
        reservationValidator.createReservationValidator,
      ).toHaveBeenCalledWith(createReservationInput);
      expect(prismaService.reservation.create).toHaveBeenCalledWith({
        data: {
          status: ReservationStatus.PENDING,
          studentId: StudentOneReservation.studentId,
          timeSlots: {
            connect: StudentOneReservation.timeSlots.map(({ id }) => ({ id })),
          },
        },
        include: INCLUDE,
      });
      expect(historyService.create).toHaveBeenCalled();
    });

    it('should throw an error when the timeSlots array contains invalid IDs', async () => {
      const createReservationInput: CreateReservationInput = {
        studentId: StudentOneReservation.studentId,
        timeSlots: [{ id: 'invalidId1' }, { id: 'invalidId2' }],
      };
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;

      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest
        .spyOn(reservationValidator, 'createReservationValidator')
        .mockRejectedValue(new Error('Invalid timeSlot IDs'));

      await expect(
        service.create(createReservationInput, authenticatedUser),
      ).rejects.toThrow('Invalid timeSlot IDs');

      expect(
        reservationValidator.createReservationValidator,
      ).toHaveBeenCalledWith(createReservationInput);
      expect(prismaService.reservation.create).not.toHaveBeenCalled();
      expect(historyService.create).not.toHaveBeenCalled();
    });
  });

  describe('findByIdReservation', () => {
    it('should throw an error when the reservation does not exist', async () => {
      const reservationId = 'nonExistentId';

      jest
        .spyOn(prismaService.reservation, 'findUniqueOrThrow')
        .mockRejectedValue(new Error('not found'));

      await expect(service.findById(reservationId)).rejects.toThrow(
        `Reservation with id ${reservationId} does not exist`,
      );

      expect(prismaService.reservation.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: reservationId },
        include: INCLUDE,
      });
    });

    it('should return the correct reservation when the reservation exists in the database', async () => {
      const reservationId = StudentOneReservation.id;
      const expectedReservation = StudentOneReservation;

      jest
        .spyOn(prismaService.reservation, 'findUniqueOrThrow')
        .mockResolvedValue(expectedReservation);

      const result = await service.findById(reservationId);

      expect(prismaService.reservation.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: reservationId },
        include: INCLUDE,
      });
      expect(result).toEqual(expectedReservation);
    });
  });

  describe('findAllReservation', () => {
    it('should return an empty array when no reservations match the given studentId', async () => {
      const nonExistentStudentId = 'nonExistentStudentId';

      jest.spyOn(prismaService.reservation, 'findMany').mockResolvedValue([]);

      const result = await service.findAll(nonExistentStudentId);

      expect(prismaService.reservation.findMany).toHaveBeenCalledWith({
        where: {
          studentId: nonExistentStudentId,
          status: undefined,
          timeSlots: {
            every: {
              teacherId: undefined,
            },
          },
        },
        include: INCLUDE,
      });
      expect(result).toEqual([]);
    });

    it('should return all reservations if no args', async () => {
      const expectedReservations = AllReservation;

      jest
        .spyOn(prismaService.reservation, 'findMany')
        .mockResolvedValue(expectedReservations);

      const result = await service.findAll();

      expect(prismaService.reservation.findMany).toHaveBeenCalledWith({
        where: {
          studentId: undefined,
          status: undefined,
          timeSlots: {
            every: {
              teacherId: undefined,
            },
          },
        },
        include: INCLUDE,
      });
      expect(result).toEqual(expectedReservations);
    });
  });

  describe('updateReservation', () => {
    it("should update reservation status to approved and change related time slots' status to taken", async () => {
      const updateReservationInput: UpdateReservationInput = {
        id: StudentOneReservation.id,
        status: ReservationStatus.APPROVED,
      };
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;

      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest.spyOn(service, 'findById').mockResolvedValue(StudentOneReservation);
      jest
        .spyOn(prismaService.timeSlot, 'updateMany')
        .mockResolvedValue(undefined);
      jest
        .spyOn(prismaService.reservation, 'updateMany')
        .mockResolvedValue(undefined);
      jest.spyOn(prismaService.reservation, 'update').mockResolvedValue({
        ...StudentOneReservation,
        status: ReservationStatus.APPROVED,
      });
      jest.spyOn(historyService, 'create').mockResolvedValue(undefined);

      await service.update(updateReservationInput, authenticatedUser);

      expect(service.findById).toHaveBeenCalledWith(updateReservationInput.id);
      expect(prismaService.timeSlot.updateMany).toHaveBeenCalledWith({
        where: {
          id: { in: StudentOneReservation.timeSlots.map(({ id }) => id) },
        },
        data: { status: TimeSlotStatus.TAKEN },
      });
      expect(prismaService.reservation.updateMany).toHaveBeenCalledWith({
        where: {
          timeSlots: {
            some: {
              id: { in: StudentOneReservation.timeSlots.map(({ id }) => id) },
            },
          },
        },
        data: { status: ReservationStatus.REJECTED },
      });
      expect(prismaService.reservation.update).toHaveBeenCalledWith({
        where: { id: updateReservationInput.id },
        data: updateReservationInput,
        include: INCLUDE,
      });
      expect(historyService.create).toHaveBeenCalled();
    });

    it('should throw an error when the reservation ID does not exist', async () => {
      const nonExistentReservationId = 'nonExistentId';
      const updateReservationInput: UpdateReservationInput = {
        id: nonExistentReservationId,
        status: ReservationStatus.APPROVED,
      };
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;

      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(
          new NotFoundException(
            `Reservation with id ${nonExistentReservationId} does not exist`,
          ),
        );

      await expect(
        service.update(updateReservationInput, authenticatedUser),
      ).rejects.toThrow(
        `Reservation with id ${nonExistentReservationId} does not exist`,
      );

      expect(service.findById).toHaveBeenCalledWith(nonExistentReservationId);
    });

    it('should update reservation with valid inputs', async () => {
      const updateReservationInput: UpdateReservationInput = {
        id: 'validId',
        status: ReservationStatus.APPROVED,
      };
      const authenticatedUser: JwtPayloadType = JWT_PAYLOAD;

      jest.spyOn(service, 'findById').mockResolvedValue(StudentOneReservation);
      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest
        .spyOn(prismaService.timeSlot, 'updateMany')
        .mockResolvedValue(undefined);
      jest
        .spyOn(prismaService.reservation, 'updateMany')
        .mockResolvedValue(undefined);
      jest.spyOn(prismaService.reservation, 'update').mockResolvedValue({
        ...StudentOneReservation,
        status: ReservationStatus.APPROVED,
      });
      jest.spyOn(historyService, 'create').mockResolvedValue(undefined);

      await service.update(updateReservationInput, authenticatedUser);

      expect(service.findById).toHaveBeenCalledWith(updateReservationInput.id);
      expect(prismaService.timeSlot.updateMany).toHaveBeenCalledWith({
        where: {
          id: { in: StudentOneReservation.timeSlots.map(({ id }) => id) },
        },
        data: { status: TimeSlotStatus.TAKEN },
      });
      expect(prismaService.reservation.updateMany).toHaveBeenCalledWith({
        where: {
          timeSlots: {
            some: {
              id: { in: StudentOneReservation.timeSlots.map(({ id }) => id) },
            },
          },
        },
        data: { status: ReservationStatus.REJECTED },
      });
      expect(prismaService.reservation.update).toHaveBeenCalledWith({
        where: { id: updateReservationInput.id },
        data: updateReservationInput,
        include: INCLUDE,
      });
      expect(historyService.create).toHaveBeenCalled();
    });
  });
});
