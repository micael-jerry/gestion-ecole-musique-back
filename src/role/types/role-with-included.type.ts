import { Action, Role } from '@prisma/client';

export type RoleWithIncluded = Role & { actions: Action[] };
