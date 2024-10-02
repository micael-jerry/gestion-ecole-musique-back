import { History, User } from '@prisma/client';

export type HistoryWithIncluded = History & {
  user: User;
  entity: object | null;
};
