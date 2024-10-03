import { Action } from '@prisma/client';

// ADMIN AUTHORIZATION
export const ActionGetAdmin: Action = {
  id: 'action_get_admin_id',
  tag: 'GET_ADMIN',
  name: 'Voir un administrateur',
  description: 'A les privilèges pour voir un administrateur.',
};

export const ActionCreateAdmin: Action = {
  id: 'action_create_admin_id',
  tag: 'CREATE_ADMIN',
  name: 'Créer un administrateur',
  description: 'A les privilèges pour créer un administrateur.',
};

export const ActionDeleteAdmin: Action = {
  id: 'action_delete_admin_id',
  tag: 'DELETE_ADMIN',
  name: 'Supprimer un administrateur',
  description: 'A les privilèges pour supprimer un administrateur.',
};

export const ActionUpdateAdmin: Action = {
  id: 'action_update_admin_id',
  tag: 'UPDATE_ADMIN',
  name: 'Mettre à jour un administrateur',
  description: 'A les privilèges pour mettre à jour un administrateur.',
};

// MANAGER AUTHORIZATION
export const ActionGetManager: Action = {
  id: 'action_get_manager_id',
  tag: 'GET_MANAGER',
  name: 'Voir un gestionnaire',
  description: 'A les privilèges pour voir un gestionnaire.',
};

export const ActionCreateManager: Action = {
  id: 'action_create_manager_id',
  tag: 'CREATE_MANAGER',
  name: 'Créer un gestionnaire',
  description: 'A les privilèges pour créer un gestionnaire.',
};

export const ActionDeleteManager: Action = {
  id: 'action_delete_manager_id',
  tag: 'DELETE_MANAGER',
  name: 'Supprimer un gestionnaire',
  description: 'A les privilèges pour supprimer un gestionnaire.',
};

export const ActionUpdateManager: Action = {
  id: 'action_update_manager_id',
  tag: 'UPDATE_MANAGER',
  name: 'Mettre à jour un gestionnaire',
  description: 'A les privilèges pour mettre à jour un gestionnaire.',
};

// TEACHER AUTHORIZATION
export const ActionGetTeacher: Action = {
  id: 'action_get_teacher_id',
  tag: 'GET_TEACHER',
  name: 'Voir un enseignant',
  description: 'A les privilèges pour voir un enseignant.',
};

export const ActionCreateTeacher: Action = {
  id: 'action_create_teacher_id',
  tag: 'CREATE_TEACHER',
  name: 'Créer un enseignant',
  description: 'A les privilèges pour créer un enseignant.',
};

export const ActionDeleteTeacher: Action = {
  id: 'action_delete_teacher_id',
  tag: 'DELETE_TEACHER',
  name: 'Supprimer un enseignant',
  description: 'A les privilèges pour supprimer un enseignant.',
};

export const ActionUpdateTeacher: Action = {
  id: 'action_update_teacher_id',
  tag: 'UPDATE_TEACHER',
  name: 'Mettre à jour un enseignant',
  description: 'A les privilèges pour mettre à jour un enseignant.',
};

// STUDENT AUTHORIZATION
export const ActionGetStudent: Action = {
  id: 'action_get_student_id',
  tag: 'GET_STUDENT',
  name: 'Voir un étudiant',
  description: 'A les privilèges pour voir un étudiant.',
};

export const ActionCreateStudent: Action = {
  id: 'action_create_student_id',
  tag: 'CREATE_STUDENT',
  name: 'Créer un étudiant',
  description: 'A les privilèges pour créer un étudiant.',
};

export const ActionDeleteStudent: Action = {
  id: 'action_delete_student_id',
  tag: 'DELETE_STUDENT',
  name: 'Supprimer un étudiant',
  description: 'A les privilèges pour supprimer un étudiant.',
};

export const ActionUpdateStudent: Action = {
  id: 'action_update_student_id',
  tag: 'UPDATE_STUDENT',
  name: 'Mettre à jour un étudiant',
  description: 'A les privilèges pour mettre à jour un étudiant.',
};

// SETTING AUTHORIZATION
export const ActionGetSetting: Action = {
  id: 'action_get_setting_id',
  tag: 'GET_SETTING',
  name: 'Voir les paramètres',
  description: 'A les privilèges pour voir les paramètres.',
};

export const ActionUpdateSetting: Action = {
  id: 'action_update_setting_id',
  tag: 'UPDATE_SETTING',
  name: 'Mettre à jour les paramètres',
  description: 'A les privilèges pour mettre à jour les paramètres.',
};

// COURSE AUTHORIZATION
export const ActionGetCourse: Action = {
  id: 'action_get_course_id',
  tag: 'GET_COURSE',
  name: 'Voir un cours',
  description: 'A les privilèges pour voir un cours.',
};

export const ActionCreateCourse: Action = {
  id: 'action_create_course_id',
  tag: 'CREATE_COURSE',
  name: 'Créer un cours',
  description: 'A les privilèges pour créer un cours.',
};

export const ActionDeleteCourse: Action = {
  id: 'action_delete_course_id',
  tag: 'DELETE_COURSE',
  name: 'Supprimer un cours',
  description: 'A les privilèges pour supprimer un cours.',
};

export const ActionUpdateCourse: Action = {
  id: 'action_update_course_id',
  tag: 'UPDATE_COURSE',
  name: 'Mettre à jour un cours',
  description: 'A les privilèges pour mettre à jour un cours.',
};

// FEE TYPE AUTHORIZATION
export const ActionGetFeeType: Action = {
  id: 'action_get_fee_type_id',
  tag: 'GET_FEE_TYPE',
  name: 'Voir un type de frais',
  description: 'A les privilèges pour voir un type de frais.',
};

export const ActionCreateFeeType: Action = {
  id: 'action_create_fee_type_id',
  tag: 'CREATE_FEE_TYPE',
  name: 'Créer un type de frais',
  description: 'A les privilèges pour créer un type de frais.',
};

export const ActionDeleteFeeType: Action = {
  id: 'action_delete_fee_type_id',
  tag: 'DELETE_FEE_TYPE',
  name: 'Supprimer un type de frais',
  description: 'A les privilèges pour supprimer un type de frais.',
};

export const ActionUpdateFeeType: Action = {
  id: 'action_update_fee_type_id',
  tag: 'UPDATE_FEE_TYPE',
  name: 'Mettre à jour un type de frais',
  description: 'A les privilèges pour mettre à jour un type de frais.',
};

// ROLE AUTHORIZATION
export const ActionGetRole: Action = {
  id: 'action_get_role_id',
  tag: 'GET_ROLE',
  name: 'Voir un rôle',
  description: 'A les privilèges pour voir un rôle.',
};

export const ActionCreateRole: Action = {
  id: 'action_create_role_id',
  tag: 'CREATE_ROLE',
  name: 'Créer un rôle',
  description: 'A les privilèges pour créer un rôle.',
};

export const ActionDeleteRole: Action = {
  id: 'action_delete_role_id',
  tag: 'DELETE_ROLE',
  name: 'Supprimer un rôle',
  description: 'A les privilèges pour supprimer un rôle.',
};

export const ActionUpdateRole: Action = {
  id: 'action_update_role_id',
  tag: 'UPDATE_ROLE',
  name: 'Mettre à jour un rôle',
  description: 'A les privilèges pour mettre à jour un rôle.',
};

// ARCHIVE AUTHORIZATION
export const ActionGetArchive: Action = {
  id: 'action_get_archive_id',
  tag: 'GET_USER_ARCHIVE',
  name: 'Voir les archives utilisateurs',
  description: 'Autorisation pour consulter les archives des utilisateurs.',
};

export const ActionArchiveUser: Action = {
  id: 'action_archive_user_id',
  tag: 'ARCHIVE_USER',
  name: 'Archiver un utilisateur',
  description: 'Autorisation pour archiver un utilisateur.',
};

export const ActionDeleteArchive: Action = {
  id: 'action_delete_archive_id',
  tag: 'DELETE_USER_ARCHIVE',
  name: 'Supprimer une archive utilisateur',
  description: 'Autorisation pour supprimer une archive utilisateur.',
};

export const ActionUnarchiveUser: Action = {
  id: 'action_unarchive_user_id',
  tag: 'UNARCHIVE_USER',
  name: 'Desarchiver un utilisateur',
  description: 'Autorisation pour desarchiver un utilisateur',
};

export const ActionGetHistory: Action = {
  id: 'action_get_history_id',
  tag: 'GET_HISTORY',
  name: 'Voir l’historique',
  description: "Autorisation pour consulter l’historique d'activité.",
};

//Payment AUTHORIZATION
export const ActionGetPayment: Action = {
  id: 'action_get_payment_id',
  tag: 'GET_PAYMENT',
  name: 'Voir toute les paiements',
  description: 'A les privilèges pour voir toute les paiements.',
};

export const ActionCreatePayment: Action = {
  id: 'action_create_payment_id',
  tag: 'CREATE_PAYMENT',
  name: 'Créer un paiement',
  description: 'A les privilèges pour créer un paiement.',
};

export const ActionSearchPayment: Action = {
  id: 'action_search_payment_id',
  tag: 'SEARCH_PAYMENT',
  name: 'Chercher un paiement',
  description: 'A les privilèges pour faire des recherche sur le paiment.',
};

export const AllAction: Action[] = [
  ActionGetAdmin,
  ActionCreateAdmin,
  ActionDeleteAdmin,
  ActionUpdateAdmin,
  ActionGetManager,
  ActionCreateManager,
  ActionDeleteManager,
  ActionUpdateManager,
  ActionGetTeacher,
  ActionCreateTeacher,
  ActionDeleteTeacher,
  ActionUpdateTeacher,
  ActionGetStudent,
  ActionCreateStudent,
  ActionDeleteStudent,
  ActionUpdateStudent,
  ActionGetSetting,
  ActionUpdateSetting,
  ActionGetCourse,
  ActionCreateCourse,
  ActionDeleteCourse,
  ActionUpdateCourse,
  ActionGetFeeType,
  ActionCreateFeeType,
  ActionDeleteFeeType,
  ActionUpdateFeeType,
  ActionGetRole,
  ActionCreateRole,
  ActionDeleteRole,
  ActionUpdateRole,
  ActionArchiveUser,
  ActionUnarchiveUser,
  ActionGetArchive,
  ActionDeleteArchive,
  ActionGetHistory,
  ActionGetPayment,
  ActionCreatePayment,
  ActionSearchPayment,
];
