import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTimeSlotInput,
  CreateTimeSlotTimeInput,
} from '../dto/create-time-slot.input';
import { PrismaService } from '../../prisma/prisma.service';
import { TIME_SLOT_MINIMUM_MINUTES } from '../constant/time-slot.constant';
import { areSameDay, getMinutesDifference } from '../utils/time-slot.util';
import { Prisma, TimeSlot, TimeSlotStatus } from '@prisma/client';
import { UpdateTimeSlotInput } from '../dto/update-time-slot.input';

@Injectable()
export class TimeSlotValidator {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Validates the creation of time slots for a teacher.
   *
   * @param {CreateTimeSlotInput} { times, teacherId } - The input parameters for time slot creation.
   * @param {CreateTimeSlotTimeInput[]} times - An array of time slots to be created.
   * @param {string} teacherId - The ID of the teacher for whom the time slots are being created.
   *
   * @throws {BadRequestException} - If the teacher with the given ID is not found.
   * @throws {BadRequestException} - If any of the time slots in the input array are invalid.
   *
   * @returns {Promise<void>} - The function does not return a value.
   */
  async createTimeSloteValidate({
    times,
    teacherId,
  }: CreateTimeSlotInput): Promise<void> {
    await this.prismaService.user
      .findFirstOrThrow({
        where: { id: teacherId, role: { name: 'TEACHER' } },
      })
      .catch(() => {
        throw new BadRequestException(`Teacher with id ${teacherId} not found`);
      });
    times.forEach((time) => this.timeValidator(time));
  }

  async updateTimeSlotValidate(
    updateTimeSlotListInput: UpdateTimeSlotInput[],
  ): Promise<void> {
    const actualTimeSlotList = await this.prismaService.timeSlot.findMany({
      where: { id: { in: updateTimeSlotListInput.map((t) => t.id) } },
    });
    if (actualTimeSlotList.length !== updateTimeSlotListInput.length) {
      throw new BadRequestException('Invalid time slot IDs');
    }
    if (
      new Set(updateTimeSlotListInput.map((t) => t.status)).has(
        TimeSlotStatus.TAKEN,
      )
    ) {
      throw new BadRequestException(
        `You can't set the status of a time slot on TAKEN directly without reservation`,
      );
    }
  }

  /**
   * Validates the start and end times of a time slot to ensure they meet specific criteria.
   *
   * @param {CreateTimeSlotTimeInput} { start, end } - The start and end times of the time slot to validate.
   *
   * @throws {BadRequestException} - If the start time is not before the end time, or if it is in the past.
   * @throws {BadRequestException} - If the start and end times are not for the same day.
   * @throws {BadRequestException} - If the duration of the time slot is not divisible by the minimum time slot duration.
   *
   * @returns {void} - The function does not return a value.
   */
  private timeValidator({ start, end }: CreateTimeSlotTimeInput): void {
    if (start.getTime() >= end.getTime() || start.getTime() < Date.now()) {
      throw new BadRequestException('Invalid time slot range');
    }
    if (!areSameDay(start, end)) {
      throw new BadRequestException('Time slots must be for the same day');
    }
    if (getMinutesDifference(start, end) % TIME_SLOT_MINIMUM_MINUTES !== 0) {
      throw new BadRequestException(
        `Time slots must be divisible by ${TIME_SLOT_MINIMUM_MINUTES} minutes.`,
      );
    }
  }

  /**
   * Validates a list of time slots to ensure they do not overlap within the same day.
   * Throws a `BadRequestException` if any overlap is detected.
   *
   * @param timeSloteCreateInputList - An array of time slots to validate. Each time slot is represented as a `Prisma.TimeSlotUncheckedCreateInput` object.
   *
   * @throws {BadRequestException} - If any time slots overlap within the same day.
   *
   * @returns {Promise<void>} - The function does not return a value.
   */
  async validateTimeSlotCreateInputList(
    timeSloteCreateInputList: Prisma.TimeSlotUncheckedCreateInput[],
  ): Promise<void> {
    for (let i = 0; i < timeSloteCreateInputList.length; i++) {
      for (let j = i + 1; j < timeSloteCreateInputList.length; j++) {
        if (
          areSameDay(
            new Date(timeSloteCreateInputList[i].start),
            new Date(timeSloteCreateInputList[j].start),
          ) &&
          getMinutesDifference(
            new Date(timeSloteCreateInputList[i].start),
            new Date(timeSloteCreateInputList[j].start),
          ) < TIME_SLOT_MINIMUM_MINUTES
        ) {
          throw new BadRequestException(
            'Time slots must not overlap within the same day.',
          );
        }
      }
    }
    const actualTimeSlots: TimeSlot[] =
      await this.prismaService.timeSlot.findMany({
        where: {
          teacherId: timeSloteCreateInputList[0].teacherId,
          status: { not: TimeSlotStatus.CANCELLED },
        },
      });
    for (const timeSloteToCreate of timeSloteCreateInputList) {
      for (const actualTimeSlot of actualTimeSlots) {
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
            'Time slots must not overlap with existing time slots.',
          );
        }
      }
    }
  }
}
