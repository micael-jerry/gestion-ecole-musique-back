import { Reservation, TimeSlot } from '@prisma/client';
import { UserWithIncluded } from '../../user/types/user-with-included.type';

export type TimeSlotWithIncluded = TimeSlot & {
  teacher: UserWithIncluded;
  reservations: (Reservation & { student: UserWithIncluded })[];
};
