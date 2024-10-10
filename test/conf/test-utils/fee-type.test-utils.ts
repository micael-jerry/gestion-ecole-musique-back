import { FeeTypeWithIncluded } from '../../../src/fee-type/types/fee-type-with-included.type';

export const FeeTypeOne: FeeTypeWithIncluded = {
  id: 'fee_type_one_id',
  name: 'Ecolage',
  description: 'Ecolage description',
  value: 100000,
  isDeleted: false,
  payments: [],
};

export const FeeTypeTwo: FeeTypeWithIncluded = {
  id: 'fee_type_two_id',
  name: 'Droit',
  description: 'droit description',
  value: 50000,
  isDeleted: false,
  payments: [],
};
