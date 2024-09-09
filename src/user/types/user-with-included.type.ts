import { MusicCategory, Role, User } from '@prisma/client';

export type UserWithIncluded = User & {
  role: Role;
  musicCategories: MusicCategory[];
};
