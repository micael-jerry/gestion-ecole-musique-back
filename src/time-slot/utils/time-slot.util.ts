import { Prisma } from '@prisma/client';
import {
  MILLISECONDS_IN_ONE_MINUTE,
  TIME_SLOT_MINIMUM_MINUTES,
} from '../constant/time-slot.constant';
import { CreateTimeSlotInput } from '../dto/create-time-slot.input';

/**
 * Calculates the absolute difference in minutes between two given dates.
 *
 * @param date1 - The first date.
 * @param date2 - The second date.
 *
 * @returns The absolute difference in minutes between `date1` and `date2`.
 */
export function getMinutesDifference(date1: Date, date2: Date): number {
  return (
    Math.abs(date1.getTime() - date2.getTime()) / MILLISECONDS_IN_ONE_MINUTE
  );
}

/**
 * Calculates the absolute difference in minutes between two given dates.//-
 * Checks if two given dates fall on the same day.//+
 *
 * @param date1 - The first date.//-
 * @param date2 - The second date.//-
 * @param date1 - The first date to compare.//+
 * @param date2 - The second date to compare.//+
 *
 * @returns The absolute difference in minutes between `date1` and `date2`.//-
 * @returns `true` if both dates fall on the same day (year, month, and date), `false` otherwise.//+
 */
export function areSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * This function generates a list of `TimeSlotUncheckedCreateInput` objects based on the given `CreateTimeSlotInput`.
 * It divides the time range specified in `createTimeSlotInput.times` into smaller time slots of a minimum duration defined by `TIME_SLOT_MINIMUM_MINUTES`.
 *
 * @param createTimeSlotInput - The input object containing the teacherId and time ranges to be divided into time slots.
 * @returns An array of `TimeSlotUncheckedCreateInput` objects representing the generated time slots.
 */
export function getTimeSlotCreateInputList(
  createTimeSlotInput: CreateTimeSlotInput,
): Prisma.TimeSlotUncheckedCreateInput[] {
  const list: Prisma.TimeSlotUncheckedCreateInput[] = [];

  // Iterate through each time range in the input
  createTimeSlotInput.times.forEach((time) => {
    const minutesDifference = getMinutesDifference(time.start, time.end);

    // If the time range is less than or equal to the minimum time slot duration, create a single time slot
    if (minutesDifference <= TIME_SLOT_MINIMUM_MINUTES)
      list.push({
        start: time.start,
        end: time.end,
        teacherId: createTimeSlotInput.teacherId,
      });
    else {
      // Calculate the number of time slots needed to cover the time range
      const numberOfTimeSlots = Math.floor(
        minutesDifference / TIME_SLOT_MINIMUM_MINUTES,
      );

      let timeSlotStart: Date = time.start;

      // Create time slots of the minimum duration and add them to the list
      for (let i = 0; i < numberOfTimeSlots; i++) {
        const timeSlotEnd = new Date(
          timeSlotStart.getTime() +
            TIME_SLOT_MINIMUM_MINUTES * MILLISECONDS_IN_ONE_MINUTE,
        );
        list.push({
          start: timeSlotStart,
          end: timeSlotEnd,
          teacherId: createTimeSlotInput.teacherId,
        });
        timeSlotStart = timeSlotEnd;
      }
    }
  });

  return list;
}
