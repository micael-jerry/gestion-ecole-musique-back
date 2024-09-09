import { Prisma } from '@prisma/client';

//All name will be uppercase_
export const SeedRole: Prisma.RoleCreateInput[] = [
  {
    name: 'ADMIN',
  },
  {
    name: 'MANAGER',
  },
  {
    name: 'STUDENT',
  },
  {
    name: 'TEACHER',
  },
];
