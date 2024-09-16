import { Prisma } from '@prisma/client';

//All tag will be uppercase_
export const SeedAction: Prisma.ActionCreateInput[] = [
  // ADMIN AUTHORIZATION
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

  // MANAGER AUTHORIZATION
  {
    tag: 'GET_MANAGER',
    name: 'OBTENIR MANAGER',
    description: 'A les privilèges pour obtenir un manager',
  },
  {
    tag: 'CREATE_MANAGER',
    name: 'CRÉER MANAGER',
    description: 'A les privilèges pour créer un manager',
  },
  {
    tag: 'DELETE_MANAGER',
    name: 'SUPPRIMER MANAGER',
    description: 'A les privilèges pour supprimer un manager',
  },
  {
    tag: 'UPDATE_MANAGER',
    name: 'METTRE À JOUR MANAGER',
    description: 'A les privilèges pour mettre à jour un manager',
  },

  // TEACHER AUTHORIZATION
  {
    tag: 'GET_TEACHER',
    name: 'OBTENIR ENSEIGNANT',
    description: 'A les privilèges pour obtenir un enseignant',
  },
  {
    tag: 'CREATE_TEACHER',
    name: 'CRÉER ENSEIGNANT',
    description: 'A les privilèges pour créer un enseignant',
  },
  {
    tag: 'DELETE_TEACHER',
    name: 'SUPPRIMER ENSEIGNANT',
    description: 'A les privilèges pour supprimer un enseignant',
  },
  {
    tag: 'UPDATE_TEACHER',
    name: 'METTRE À JOUR ENSEIGNANT',
    description: 'A les privilèges pour mettre à jour un enseignant',
  },

  // STUDENT AUTHORIZATION
  {
    tag: 'GET_STUDENT',
    name: 'OBTENIR ÉTUDIANT',
    description: 'A les privilèges pour obtenir un étudiant',
  },
  {
    tag: 'CREATE_STUDENT',
    name: 'CRÉER ÉTUDIANT',
    description: 'A les privilèges pour créer un étudiant',
  },
  {
    tag: 'DELETE_STUDENT',
    name: 'SUPPRIMER ÉTUDIANT',
    description: 'A les privilèges pour supprimer un étudiant',
  },
  {
    tag: 'UPDATE_STUDENT',
    name: 'METTRE À JOUR ÉTUDIANT',
    description: 'A les privilèges pour mettre à jour un étudiant',
  },

  // SETTING AUTHORIZATION
  {
    tag: 'GET_SETTING',
    name: 'OBTENIR PARAMÈTRE',
    description: 'A les privilèges pour obtenir un paramètre',
  },
  {
    tag: 'UPDATE_SETTING',
    name: 'METTRE À JOUR PARAMÈTRE',
    description: 'A les privilèges pour mettre à jour un paramètre',
  },

  // MUSIC CATEGORIES AUTHORIZATION
  {
    tag: 'GET_MUSIC',
    name: 'OBTENIR MUSIQUE',
    description: 'A les privilèges pour obtenir une musique',
  },
  {
    tag: 'CREATE_MUSIC',
    name: 'CRÉER MUSIQUE',
    description: 'A les privilèges pour créer une musique',
  },
  {
    tag: 'DELETE_MUSIC',
    name: 'SUPPRIMER MUSIQUE',
    description: 'A les privilèges pour supprimer une musique',
  },
  {
    tag: 'UPDATE_MUSIC',
    name: 'METTRE À JOUR MUSIQUE',
    description: 'A les privilèges pour mettre à jour une musique',
  },

  // FEE TYPE AUTHORIZATION
  {
    tag: 'GET_FEE_TYPE',
    name: 'OBTENIR TYPE DE FRAIS',
    description: 'A les privilèges pour obtenir un type de frais',
  },
  {
    tag: 'CREATE_FEE_TYPE',
    name: 'CRÉER TYPE DE FRAIS',
    description: 'A les privilèges pour créer un type de frais',
  },
  {
    tag: 'DELETE_FEE_TYPE',
    name: 'SUPPRIMER TYPE DE FRAIS',
    description: 'A les privilèges pour supprimer un type de frais',
  },
  {
    tag: 'UPDATE_FEE_TYPE',
    name: 'METTRE À JOUR TYPE DE FRAIS',
    description: 'A les privilèges pour mettre à jour un type de frais',
  },

  // ROLE AUTHORIZATION
  {
    tag: 'GET_ROLE',
    name: 'OBTENIR RÔLE',
    description: 'A les privilèges pour obtenir un rôle',
  },
  {
    tag: 'CREATE_ROLE',
    name: 'CRÉER RÔLE',
    description: 'A les privilèges pour créer un rôle',
  },
  {
    tag: 'DELETE_ROLE',
    name: 'SUPPRIMER RÔLE',
    description: 'A les privilèges pour supprimer un rôle',
  },
  {
    tag: 'UPDATE_ROLE',
    name: 'METTRE À JOUR RÔLE',
    description: 'A les privilèges pour mettre à jour un rôle',
  },

  // ARCHIVE AUTHORIZATION
  {
    tag: 'GET_USER_ARCHIVE',
    name: 'OBTENIR ARCHIVE UTILISATEUR',
    description: 'A les privilèges pour obtenir une archive utilisateur',
  },
  {
    tag: 'DELETE_USER_ARCHIVE',
    name: 'SUPPRIMER ARCHIVE UTILISATEUR',
    description: 'A les privilèges pour supprimer une archive utilisateur',
  },
  {
    tag: 'ARCHIVE_USER',
    name: 'ARCHIVER UTILISATEUR',
    description: 'A les privilèges pour archiver un utilisateur',
  },
];
