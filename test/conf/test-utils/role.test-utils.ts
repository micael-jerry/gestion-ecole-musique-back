import { RoleWithIncluded } from 'src/role/types/role-with-included.type';
import { AllAction } from './action.test-utils';

export const RoleAdmin: RoleWithIncluded = {
  id: 'role_one_id',
  name: 'ADMIN',
  actions: AllAction,
};

export const RoleManager: RoleWithIncluded = {
  id: 'role_two_id',
  name: 'MANAGER',
  actions: [],
};
