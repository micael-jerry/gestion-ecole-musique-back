import { Prisma } from '@prisma/client';

//All tag will be uppercase_
export const SeedAction: Prisma.ActionCreateInput[] = [
  // USER AUTHORIZATION

  {
    tag: 'GET_USER',
    name: 'GET USER',
    description: 'Has privileges to get user ',
  },
  {
    tag: 'CREATE_USER',
    name: 'CREATE USER',
    description: 'Has privileges to create user ',
  },
  {
    tag: 'DELETE_USER',
    name: 'DELETE USER',
    description: 'Has privileges to delete user ',
  },
  {
    tag: 'UPDATE_USER',
    name: 'UPDATE USER',
    description: 'Has privileges to update user ',
  },

  // SETTING AUTHORIZATION

  {
    tag: 'GET_SETTING',
    name: 'GET SETTING',
    description: 'Has privileges to get setting ',
  },
  {
    tag: 'UPDATE_SETTING',
    name: 'UPDATE SETTING',
    description: 'Has privileges to update setting ',
  },

  // MUSIC CATEGORIES AUTHORIZATION

  {
    tag: 'GET_MUSIC',
    name: 'GET MUSIC',
    description: 'Has privileges to get music ',
  },
  {
    tag: 'CREATE_MUSIC',
    name: 'CREATE MUSIC',
    description: 'Has privileges to create music ',
  },
  {
    tag: 'DELETE_MUSIC',
    name: 'DELETE MUSIC',
    description: 'Has privileges to delete music ',
  },
  {
    tag: 'UPDATE_MUSIC',
    name: 'UPDATE MUSIC',
    description: 'Has privileges to update music ',
  },

  // FEE TYPE AUTHORIZATION

  {
    tag: 'GET_FEE_TYPE',
    name: 'GET FEE TYPE',
    description: 'Has privileges to get fee type ',
  },
  {
    tag: 'CREATE_FEE_TYPE',
    name: 'CREATE FEE TYPE',
    description: 'Has privileges to create fee type ',
  },
  {
    tag: 'DELETE_FEE_TYPE',
    name: 'DELETE FEE TYPE',
    description: 'Has privileges to delete fee type ',
  },
  {
    tag: 'UPDATE_FEE_TYPE',
    name: 'UPDATE FEE TYPE',
    description: 'Has privileges to update fee type ',
  },

  // ROLE AUTHORIZATION

  {
    tag: 'GET_ROLE',
    name: 'GET ROLE',
    description: 'Has privileges to get fee type ',
  },
  {
    tag: 'CREATE_ROLE',
    name: 'CREATE ROLE',
    description: 'Has privileges to create fee type ',
  },
  {
    tag: 'DELETE_ROLE',
    name: 'DELETE ROLE',
    description: 'Has privileges to delete fee type ',
  },
  {
    tag: 'UPDATE_ROLE',
    name: 'UPDATE ROLE',
    description: 'Has privileges to update fee type ',
  },
];
