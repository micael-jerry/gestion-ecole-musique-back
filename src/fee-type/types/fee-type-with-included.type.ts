import { FeeType, Payment } from '@prisma/client';

export type FeeTypeWithIncluded = FeeType & { payments: Payment[] };
