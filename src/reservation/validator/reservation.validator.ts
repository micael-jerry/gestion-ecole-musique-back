import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationInput } from '../dto/create-reservation.input';
import { TimeSlotStatus } from '@prisma/client';

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

    const actualTimeSlots = await this.prismaService.timeSlot.findMany({
      where: { id: { in: timeSlots.map((t) => t.id) } },
    });
    if (actualTimeSlots.length !== timeSlots.length) {
      throw new BadRequestException('Invalid time slot IDs');
    }
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
}
