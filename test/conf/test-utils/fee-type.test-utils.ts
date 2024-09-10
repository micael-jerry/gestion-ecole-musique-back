import { FeeType } from '@prisma/client';

export const FeeTypeOne: FeeType = {
  id: 'fee_type_one_id',
  name: 'Ecolage',
  description: 'Ecolage description',
  value: 100000,
};

export const FeeTypeTwo: FeeType = {
  id: 'fee_type_two_id',
  name: 'Droit',
  description: 'droit description',
  value: 50000,
};
