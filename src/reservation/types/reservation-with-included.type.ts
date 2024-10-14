import { Reservation, TimeSlot } from '@prisma/client';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';

export type ReservationWithIncluded = Reservation & {
  student: UserWithIncluded;
  timeSlots: TimeSlot[];
};
