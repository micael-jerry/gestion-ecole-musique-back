import { Prisma } from '@prisma/client';

// All tags will be uppercase_
export const SeedAction: Prisma.ActionCreateInput[] = [
  // ADMIN AUTHORIZATION
  {
    tag: 'GET_ADMIN',
    name: 'Voir un administrateur',
    description: 'Autorisation pour voir un administrateur.',
  },
  {
    tag: 'CREATE_ADMIN',
    name: 'Créer un administrateur',
    description: 'Autorisation pour créer un nouvel administrateur.',
  },
  {
    tag: 'DELETE_ADMIN',
    name: 'Supprimer un administrateur',
    description: 'Autorisation pour supprimer un administrateur.',
  },
  {
    tag: 'UPDATE_ADMIN',
    name: 'Mettre à jour un administrateur',
    description:
      'Autorisation pour modifier les informations d’un administrateur.',
  },

  // MANAGER AUTHORIZATION
  {
    tag: 'GET_MANAGER',
    name: 'Voir un gestionnaire',
    description: 'Autorisation pour voir un gestionnaire.',
  },
  {
    tag: 'CREATE_MANAGER',
    name: 'Créer un gestionnaire',
    description: 'Autorisation pour créer un nouveau gestionnaire.',
  },
  {
    tag: 'DELETE_MANAGER',
    name: 'Supprimer un gestionnaire',
    description: 'Autorisation pour supprimer un gestionnaire.',
  },
  {
    tag: 'UPDATE_MANAGER',
    name: 'Mettre à jour un gestionnaire',
    description:
      'Autorisation pour modifier les informations d’un gestionnaire.',
  },

  // TEACHER AUTHORIZATION
  {
    tag: 'GET_TEACHER',
    name: 'Voir un enseignant',
    description: 'Autorisation pour voir un enseignant.',
  },
  {
    tag: 'CREATE_TEACHER',
    name: 'Créer un enseignant',
    description: 'Autorisation pour créer un nouvel enseignant.',
  },
  {
    tag: 'DELETE_TEACHER',
    name: 'Supprimer un enseignant',
    description: 'Autorisation pour supprimer un enseignant.',
  },
  {
    tag: 'UPDATE_TEACHER',
    name: 'Mettre à jour un enseignant',
    description: 'Autorisation pour modifier les informations d’un enseignant.',
  },

  // STUDENT AUTHORIZATION
  {
    tag: 'GET_STUDENT',
    name: 'Voir un étudiant',
    description: 'Autorisation pour voir un étudiant.',
  },
  {
    tag: 'CREATE_STUDENT',
    name: 'Créer un étudiant',
    description: 'Autorisation pour ajouter un nouvel étudiant.',
  },
  {
    tag: 'DELETE_STUDENT',
    name: 'Supprimer un étudiant',
    description: 'Autorisation pour supprimer un étudiant.',
  },
  {
    tag: 'UPDATE_STUDENT',
    name: 'Mettre à jour un étudiant',
    description: 'Autorisation pour modifier les informations d’un étudiant.',
  },

  // SETTING AUTHORIZATION
  {
    tag: 'GET_SETTING',
    name: 'Voir les paramètres',
    description: 'Autorisation pour consulter les paramètres du système.',
  },
  {
    tag: 'UPDATE_SETTING',
    name: 'Mettre à jour les paramètres',
    description: 'Autorisation pour modifier les paramètres du système.',
  },

  // COURSE AUTHORIZATION
  {
    tag: 'GET_COURSE',
    name: 'Voir un cours',
    description: 'Autorisation pour consulter les cours disponibles.',
  },
  {
    tag: 'CREATE_COURSE',
    name: 'Créer un cours',
    description: 'Autorisation pour ajouter un nouveau cours.',
  },
  {
    tag: 'DELETE_COURSE',
    name: 'Supprimer un cours',
    description: 'Autorisation pour supprimer un cours.',
  },
  {
    tag: 'UPDATE_COURSE',
    name: 'Mettre à jour un cours',
    description: 'Autorisation pour modifier les informations d’un cours.',
  },

  // FEE TYPE AUTHORIZATION
  {
    tag: 'GET_FEE_TYPE',
    name: 'Voir un type de frais',
    description: 'Autorisation pour accéder aux types de frais.',
  },
  {
    tag: 'CREATE_FEE_TYPE',
    name: 'Créer un type de frais',
    description: 'Autorisation pour ajouter un nouveau type de frais.',
  },
  {
    tag: 'DELETE_FEE_TYPE',
    name: 'Supprimer un type de frais',
    description: 'Autorisation pour supprimer un type de frais.',
  },
  {
    tag: 'UPDATE_FEE_TYPE',
    name: 'Mettre à jour un type de frais',
    description:
      'Autorisation pour modifier les informations d’un type de frais.',
  },

  // ROLE AUTHORIZATION
  {
    tag: 'GET_ROLE',
    name: 'Voir un rôle',
    description: 'Autorisation pour accéder aux rôles.',
  },
  {
    tag: 'CREATE_ROLE',
    name: 'Créer un rôle',
    description: 'Autorisation pour ajouter un nouveau rôle.',
  },
  {
    tag: 'DELETE_ROLE',
    name: 'Supprimer un rôle',
    description: 'Autorisation pour supprimer un rôle.',
  },
  {
    tag: 'UPDATE_ROLE',
    name: 'Mettre à jour un rôle',
    description: 'Autorisation pour modifier les informations d’un rôle.',
  },

  // ARCHIVE AUTHORIZATION
  {
    tag: 'GET_USER_ARCHIVE',
    name: 'Voir les archives utilisateurs',
    description: 'Autorisation pour consulter les archives des utilisateurs.',
  },
  {
    tag: 'DELETE_USER_ARCHIVE',
    name: 'Supprimer une archive utilisateur',
    description: 'Autorisation pour supprimer une archive utilisateur.',
  },
  {
    tag: 'ARCHIVE_USER',
    name: 'Archiver un utilisateur',
    description: 'Autorisation pour archiver un utilisateur.',
  },
  {
    tag: 'UNARCHIVE_USER',
    name: 'Desarchiver un utilisateur',
    description: 'Autorisation pour desarchiver un utilisateur',
  },

  // HISTORY AUTHORIZATION
  {
    tag: 'GET_HISTORY',
    name: 'Voir l’historique',
    description: "Autorisation pour consulter l’historique d'activité.",
  },

  // TIME SLOT AUTHORIZATION
  {
    tag: 'CREATE_TIME_SLOT',
    name: 'Créer un créneau horaire',
    description: 'Autorisation pour ajouter un nouveau créneau horaire.',
  },
  {
    tag: 'UPDATE_TIME_SLOT',
    name: 'Mettre à jour un créneau horaire',
    description: 'Autorisation pour modifier un créneau horaire.',
  },
  {
    tag: 'GET_TIME_SLOT',
    name: 'Voir un créneau horaire',
    description: 'Autorisation pour consulter un créneau horaire.',
  },
];
