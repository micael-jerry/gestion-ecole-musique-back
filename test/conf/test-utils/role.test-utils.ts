import { RoleWithIncluded } from 'src/role/types/role-with-included.type';
import {
  ActionCreateManager,
  ActionDeleteManager,
  ActionGetCourse,
  ActionGetFeeType,
  ActionGetManager,
  ActionGetSetting,
  ActionUpdateManager,
  AllAction,
} from './action.test-utils';

export const RoleAdmin: RoleWithIncluded = {
  id: 'role_one_id',
  name: 'ADMIN',
  actions: AllAction,
};

export const RoleManager: RoleWithIncluded = {
  id: 'role_two_id',
  name: 'MANAGER',
  actions: [
    ActionGetManager,
    ActionCreateManager,
    ActionUpdateManager,
    ActionDeleteManager,
    ActionGetCourse,
    ActionGetFeeType,
    ActionGetSetting,
  ],
};

export const RoleStudent: RoleWithIncluded = {
  id: 'role_three_id',
  name: 'STUDENT',
  actions: [],
};

export const RoleTeacher: RoleWithIncluded = {
  id: 'role_four_id',
  name: 'TEACHER',
  actions: [],
};
