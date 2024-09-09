import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const DefaultUser = (
  roleId: string,
): Prisma.UserUncheckedCreateInput => {
  return {
    roleId: roleId,
    firstname: 'Doe',
    lastname: 'John',
    email: 'johndoe@example.com',
    password: bcrypt.hashSync('password123', bcrypt.genSaltSync()), // password123
    address: '123 Main St',
    phone: '0342222222',
    picture: null,
    description: 'Default user',
  };
};
