import { Action, Role, User } from '@prisma/client';

export type RoleWithIncluded = Role & { actions: Action[]; users: User[] };
