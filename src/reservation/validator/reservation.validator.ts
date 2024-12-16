import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationInput } from '../dto/create-reservation.input';
import { TimeSlot, TimeSlotStatus } from '@prisma/client';
import {
  areSameDay,
  getMinutesDifference,
} from '../../time-slot/utils/time-slot.util';
import { TIME_SLOT_MINIMUM_MINUTES } from '../../time-slot/constant/time-slot.constant';

@Injectable()
export class ReservationValidator {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Validates the input for creating a new reservation.
   *
   * @param {CreateReservationInput} { studentId, timeSlots } - The input data for creating a reservation.
   * @param {string} studentId - The ID of the student making the reservation.
   * @param {Array<{ id: string }>} timeSlots - An array of time slot objects containing the IDs of the selected time slots.
   *
   * @throws {BadRequestException} If the student ID is not found in the database.
   * @throws {BadRequestException} If any of the time slot IDs are invalid.
   * @throws {BadRequestException} If the time slots are not all from the same teacher.
   * @throws {BadRequestException} If the time slots are not all from the same status AVAILABLE.
   *
   * @returns {Promise<void>} A promise that resolves when the validation is successful.
   */
  async createReservationValidator({
    studentId,
    timeSlots,
  }: CreateReservationInput): Promise<void> {
    await this.prismaService.user
      .findUniqueOrThrow({
        where: { id: studentId, role: { name: 'STUDENT' } },
      })
      .catch(() => {
        throw new BadRequestException(`Student with id ${studentId} not found`);
      });

    const actualTimeSlots: TimeSlot[] =
      await this.prismaService.timeSlot.findMany({
        where: { id: { in: timeSlots.map((t) => t.id) } },
        orderBy: { start: 'asc' },
      });
    if (actualTimeSlots.length !== timeSlots.length) {
      throw new BadRequestException('Invalid time slot IDs');
    }

    const reservedTimeSlots = await this.prismaService.timeSlot.findMany({
      where: {
        status: 'TAKEN',
        reservations: { every: { studentId: studentId } },
      },
    });

    this.validateReservationTimeSlotList(actualTimeSlots, reservedTimeSlots);

    if (new Set(actualTimeSlots.map((t) => t.teacherId)).size !== 1) {
      throw new BadRequestException(
        'All time slots must be from the same teacher',
      );
    }
    const actualTimeSlotsStatusSet = new Set(
      actualTimeSlots.map((t) => t.status),
    );
    if (
      actualTimeSlotsStatusSet.size !== 1 ||
      !actualTimeSlotsStatusSet.has(TimeSlotStatus.AVAILABLE)
    ) {
      throw new BadRequestException(
        'All selected time slots must be available',
      );
    }
  }

  validateReservationTimeSlotList(
    timeSlotListToReservation: TimeSlot[],
    timeSlotListReserved: TimeSlot[],
  ): void {
    for (const timeSloteToCreate of timeSlotListToReservation) {
      for (const actualTimeSlot of timeSlotListReserved) {
        if (
          areSameDay(
            new Date(timeSloteToCreate.start),
            new Date(actualTimeSlot.start),
          ) &&
          getMinutesDifference(
            new Date(timeSloteToCreate.start),
            new Date(actualTimeSlot.start),
          ) < TIME_SLOT_MINIMUM_MINUTES
        ) {
          throw new BadRequestException(
            'This student already has a course with another teacher at one or more of these levels.',
          );
        }
      }
    }
  }
}
