import { Prisma } from '@prisma/client';

//All tag will be uppercase_
export const SeedAction: Prisma.ActionCreateInput[] = [
  // USER AUTHORIZATION

  {
    tag: 'GET_ADMIN',
    name: 'OBTENIR ADMIN',
    description: 'A les privilèges pour obtenir un admin',
  },
  {
    tag: 'CREATE_ADMIN',
    name: 'CRÉER ADMIN',
    description: 'A les privilèges pour créer un admin',
  },
  {
    tag: 'DELETE_ADMIN',
    name: 'SUPPRIMER ADMIN',
    description: 'A les privilèges pour supprimer un admin',
  },
  {
    tag: 'UPDATE_ADMIN',
    name: 'METTRE À JOUR ADMIN',
    description: 'A les privilèges pour mettre à jour un admin',
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

  // ARCHIVE AUTHORIZATION

  {
    tag: 'GET_USER_ARCHIVE',
    name: 'GET USER ARCHIVE',
    description: 'Has privileges to get user archive',
  },
  {
    tag: 'DELETE_USER_ARCHIVE',
    name: 'DELETE USER ARCHIVE',
    description: 'Has privileges to delete user archive',
  },
  {
    tag: 'ARCHIVE_USER',
    name: 'ARCHIVE USER',
    description: 'Has privileges to archive user',
  },
];
