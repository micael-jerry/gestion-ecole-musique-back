import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationWithIncluded } from './types/reservation-with-included.type';
import { CreateReservationInput } from './dto/create-reservation.input';
import { ReservationValidator } from './validator/reservation.validator';
import {
  EntityType,
  OperationType,
  ReservationStatus,
  TimeSlotStatus,
} from '@prisma/client';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class ReservationService {
  private static readonly reservationInclude = {
    student: {
      include: { role: true, courses: true, payments: true, timeSlots: true },
    },
    timeSlots: true,
  };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly reservationValidator: ReservationValidator,
    private readonly historyService: HistoryService,
  ) {}

  async create(
    createReservationInput: CreateReservationInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<ReservationWithIncluded> {
    await this.reservationValidator.createReservationValidator(
      createReservationInput,
    );

    return await this.prismaService.$transaction(async (tx) => {
      const reservationCreated = await tx.reservation.create({
        data: {
          status: ReservationStatus.PENDING,
          studentId: createReservationInput.studentId,
          timeSlots: { connect: createReservationInput.timeSlots },
        },
        include: ReservationService.reservationInclude,
      });
      await this.historyService.create(
        {
          entityId: reservationCreated.id,
          entityType: EntityType.RESERVATION,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return reservationCreated;
    });
  }

  async findById(id: string): Promise<ReservationWithIncluded> {
    return await this.prismaService.reservation
      .findUniqueOrThrow({
        where: { id },
        include: ReservationService.reservationInclude,
      })
      .catch(() => {
        throw new NotFoundException(`Reservation with id ${id} does not exist`);
      });
  }

  async findAll(
    studentId?: string,
    status?: ReservationStatus,
    timeSlotsTeacherId?: string,
  ): Promise<ReservationWithIncluded[]> {
    return await this.prismaService.reservation.findMany({
      where: {
        studentId: studentId ?? undefined,
        status: status ?? undefined,
        timeSlots: {
          every: {
            teacherId: timeSlotsTeacherId ?? undefined,
          },
        },
      },
      include: ReservationService.reservationInclude,
    });
  }

  async update(
    updateReservationInput: UpdateReservationInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<ReservationWithIncluded> {
    const actualReservation = await this.findById(updateReservationInput.id);

    return this.prismaService.$transaction(async (tx) => {
      if (updateReservationInput.status === ReservationStatus.APPROVED) {
        const actualTimeSlotIdList = actualReservation.timeSlots.map(
          ({ id }) => id,
        );
        await tx.timeSlot.updateMany({
          where: {
            id: { in: actualTimeSlotIdList },
          },
          data: { status: TimeSlotStatus.TAKEN },
        });
        await tx.reservation.updateMany({
          where: {
            timeSlots: {
              some: { id: { in: actualTimeSlotIdList } },
            },
          },
          data: { status: ReservationStatus.REJECTED },
        });
      }
      const reservationUpdated = await tx.reservation.update({
        where: { id: updateReservationInput.id },
        data: updateReservationInput,
        include: ReservationService.reservationInclude,
      });
      await this.historyService.create(
        {
          entityId: reservationUpdated.id,
          entityType: EntityType.RESERVATION,
          operationType: OperationType.UPDATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return reservationUpdated;
    });
  }
}
