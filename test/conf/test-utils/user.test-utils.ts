import { RoleAdmin, RoleManager } from './role.test-utils';
import * as bcrypt from 'bcrypt';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';

export const UserOne: UserWithIncluded = {
  id: 'user_one_id',
  roleId: RoleAdmin.id,
  firstname: 'Doe',
  lastname: 'John',
  email: 'johndoe@example.com',
  password: bcrypt.hashSync('password123', bcrypt.genSaltSync()), // password123
  address: '123 Main St',
  phone: '0342222222',
  picture: null,
  description: 'Default user',
  role: RoleAdmin,
  courses: [],
  isArchive: false,
};

export const UserTwo: UserWithIncluded = {
  id: 'user_two_id',
  roleId: RoleManager.id,
  firstname: 'Tom',
  lastname: 'Holland',
  email: 'tomholland@example.com',
  password: bcrypt.hashSync('hollandSecurePass', bcrypt.genSaltSync()),
  address: '321 Birch Blvd',
  phone: '0348888888',
  picture: null,
  description: 'New user exploring the platform',
  role: RoleManager,
  courses: [],
  isArchive: false,
};

export const UserThree: UserWithIncluded = {
  id: 'user_three_id',
  roleId: RoleAdmin.id,
  firstname: 'Alice',
  lastname: 'Johnson',
  email: 'alicejohnson@example.com',
  password: bcrypt.hashSync('myPass789', bcrypt.genSaltSync()),
  address: '789 Pine Rd',
  phone: '0344444444',
  picture: null,
  description: 'Administrator of the platform',
  role: RoleAdmin,
  courses: [],
  isArchive: false,
};

export const UserFour: UserWithIncluded = {
  id: 'user_four_id',
  roleId: RoleManager.id,
  firstname: 'Bob',
  lastname: 'Williams',
  email: 'bobwilliams@example.com',
  password: bcrypt.hashSync('passWord321', bcrypt.genSaltSync()),
  address: '321 Cedar St',
  phone: '0345555555',
  picture: null,
  description: 'User interested in rock music',
  role: RoleManager,
  courses: [],
  isArchive: false,
};

export const UserFive: UserWithIncluded = {
  id: 'user_five_id',
  roleId: RoleAdmin.id,
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'chrisevans@example.com',
  password: bcrypt.hashSync('evansPassword', bcrypt.genSaltSync()),
  address: '987 Willow Ln',
  phone: '0346666666',
  picture: null,
  description: 'User exploring jazz music',
  role: RoleAdmin,
  courses: [],
  isArchive: false,
};

export const UserSix: UserWithIncluded = {
  id: 'user_six_id',
  roleId: RoleManager.id,
  firstname: 'Natalie',
  lastname: 'Portman',
  email: 'natalieportman@example.com',
  password: bcrypt.hashSync('nataliePass123', bcrypt.genSaltSync()),
  address: '654 Maple Dr',
  phone: '0347777777',
  picture: null,
  description: 'Administrator of multiple categories',
  role: RoleManager,
  courses: [],
  isArchive: false,
};
