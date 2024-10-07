import { FeeType } from '@prisma/client';
import { Payment } from '../entities/payment.entity';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';

export type PaymentWithIncluded = Payment & {
  feeType: FeeType;
  user: UserWithIncluded;
};
