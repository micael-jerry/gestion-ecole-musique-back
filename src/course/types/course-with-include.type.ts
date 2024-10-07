import { Course, User } from '@prisma/client';

export type CourseWithIncluded = Course & { users: User[] };
