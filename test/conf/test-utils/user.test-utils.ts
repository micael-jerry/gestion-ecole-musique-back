import { User } from '@prisma/client';
import { RoleOne, RoleTwo } from './role.test-utils';

export const UserOne: User = {
  id: 'user_one_id',
  roleId: RoleOne.id,
  firstname: 'user one firstname',
  lastname: 'user one lastname',
  email: 'userone@example.com',
  password: '$2a$20$iMc68SJL6s7WqRthoKJBHuCfIZ3O7YwonB8pNopC2rSmPFFI08B1W', // 'password123',
  address: '123 Main St',
  phone: '0342222222',
  picture: null,
  description: 'User One Description',
};

export const UserTwo: User = {
  id: 'user_two_id',
  roleId: RoleTwo.id,
  firstname: 'user two firstname',
  lastname: 'user two lastname',
  email: 'usertwo@example.com',
  password: '$2a$20$iMc68SJL6s7WqRthoKJBHuCfIZ3O7YwonB8pNopC2rSmPFFI08B1W', // 'password123',
  address: '456 Elm St',
  phone: '0343333333',
  picture: null,
  description: 'User Two Description',
};
