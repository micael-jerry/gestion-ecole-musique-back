import { Course, Payment, Role, TimeSlot, User } from '@prisma/client';

export type UserWithIncluded = User & {
  role: Role;
  courses: Course[];
  payments: Payment[];
  timeSlots: TimeSlot[];
};
