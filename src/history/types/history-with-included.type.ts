import { History } from '@prisma/client';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';

export type HistoryWithIncluded = History & {
  user: UserWithIncluded;
  entity: JSON | null;
};
