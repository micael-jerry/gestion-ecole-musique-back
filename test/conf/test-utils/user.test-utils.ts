import { RoleAdmin, RoleManager } from './role.test-utils';
import * as bcrypt from 'bcrypt';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';
import { MusicCategoryOne } from './music-category.test-utils';

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
  musicCategories: [MusicCategoryOne],
  isArchive: false,
};

export const UserTwo: UserWithIncluded = {
  id: 'user_two_id',
  roleId: RoleManager.id,
  firstname: 'user two firstname',
  lastname: 'user two lastname',
  email: 'usertwo@example.com',
  password: bcrypt.hashSync('password123', bcrypt.genSaltSync()), // 'password123',
  address: '456 Elm St',
  phone: '0343333333',
  picture: null,
  description: 'User Two Description',
  role: RoleManager,
  musicCategories: [MusicCategoryOne],
  isArchive: false,
};
