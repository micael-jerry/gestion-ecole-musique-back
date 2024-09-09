import { Action, Role } from '@prisma/client';

export type ActionWithIncluded = Action & { roles: Role[] };
