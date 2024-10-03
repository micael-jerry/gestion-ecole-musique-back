import { Course, Payment, Role, User } from '@prisma/client';

export type UserWithIncluded = User & {
  role: Role;
  courses: Course[];
  payments: Payment[];
};
