import { Action } from '@prisma/client';

// ADMIN AUTHORIZATION
export const ActionGetAdmin: Action = {
  id: 'action_get_admin_id',
  tag: 'GET_ADMIN',
  name: 'OBTENIR ADMINISTRATEUR',
  description: 'A les privilèges pour obtenir un admininistrateur',
};

export const ActionCreateAdmin: Action = {
  id: 'action_create_admin_id',
  tag: 'CREATE_ADMIN',
  name: 'CRÉER ADMINISTRATEUR',
  description: 'A les privilèges pour créer un admininistrateur',
};

export const ActionDeleteAdmin: Action = {
  id: 'action_delete_admin_id',
  tag: 'DELETE_ADMIN',
  name: 'SUPPRIMER ADMINISTRATEUR',
  description: 'A les privilèges pour supprimer un admininistrateur',
};

export const ActionUpdateAdmin: Action = {
  id: 'action_update_admin_id',
  tag: 'UPDATE_ADMIN',
  name: 'METTRE À JOUR ADMINISTRATEUR',
  description: 'A les privilèges pour mettre à jour un admininistrateur',
};

// MANAGER AUTHORIZATION
export const ActionGetManager: Action = {
  id: 'action_get_manager_id',
  tag: 'GET_MANAGER',
  name: 'OBTENIR GESTIONNAIRE',
  description: 'A les privilèges pour obtenir un gestionnaire',
};

export const ActionCreateManager: Action = {
  id: 'action_create_manager_id',
  tag: 'CREATE_MANAGER',
  name: 'CRÉER GESTIONNAIRE',
  description: 'A les privilèges pour créer un gestionnaire',
};

export const ActionDeleteManager: Action = {
  id: 'action_delete_manager_id',
  tag: 'DELETE_MANAGER',
  name: 'SUPPRIMER GESTIONNAIRE',
  description: 'A les privilèges pour supprimer un gestionnaire',
};

export const ActionUpdateManager: Action = {
  id: 'action_update_manager_id',
  tag: 'UPDATE_MANAGER',
  name: 'METTRE À JOUR GESTIONNAIRE',
  description: 'A les privilèges pour mettre à jour un gestionnaire',
};

// TEACHER AUTHORIZATION
export const ActionGetTeacher: Action = {
  id: 'action_get_teacher_id',
  tag: 'GET_TEACHER',
  name: 'OBTENIR ENSEIGNANT',
  description: 'A les privilèges pour obtenir un enseignant',
};

export const ActionCreateTeacher: Action = {
  id: 'action_create_teacher_id',
  tag: 'CREATE_TEACHER',
  name: 'CRÉER ENSEIGNANT',
  description: 'A les privilèges pour créer un enseignant',
};

export const ActionDeleteTeacher: Action = {
  id: 'action_delete_teacher_id',
  tag: 'DELETE_TEACHER',
  name: 'SUPPRIMER ENSEIGNANT',
  description: 'A les privilèges pour supprimer un enseignant',
};

export const ActionUpdateTeacher: Action = {
  id: 'action_update_teacher_id',
  tag: 'UPDATE_TEACHER',
  name: 'METTRE À JOUR ENSEIGNANT',
  description: 'A les privilèges pour mettre à jour un enseignant',
};

// STUDENT AUTHORIZATION
export const ActionGetStudent: Action = {
  id: 'action_get_student_id',
  tag: 'GET_STUDENT',
  name: 'OBTENIR ÉTUDIANT',
  description: 'A les privilèges pour obtenir un étudiant',
};

export const ActionCreateStudent: Action = {
  id: 'action_create_student_id',
  tag: 'CREATE_STUDENT',
  name: 'CRÉER ÉTUDIANT',
  description: 'A les privilèges pour créer un étudiant',
};

export const ActionDeleteStudent: Action = {
  id: 'action_delete_student_id',
  tag: 'DELETE_STUDENT',
  name: 'SUPPRIMER ÉTUDIANT',
  description: 'A les privilèges pour supprimer un étudiant',
};

export const ActionUpdateStudent: Action = {
  id: 'action_update_student_id',
  tag: 'UPDATE_STUDENT',
  name: 'METTRE À JOUR ÉTUDIANT',
  description: 'A les privilèges pour mettre à jour un étudiant',
};

// SETTING AUTHORIZATION
export const ActionGetSetting: Action = {
  id: 'action_get_setting_id',
  tag: 'GET_SETTING',
  name: 'OBTENIR PARAMÈTRE',
  description: 'A les privilèges pour obtenir un paramètre',
};

export const ActionUpdateSetting: Action = {
  id: 'action_update_setting_id',
  tag: 'UPDATE_SETTING',
  name: 'METTRE À JOUR PARAMÈTRE',
  description: 'A les privilèges pour mettre à jour un paramètre',
};

// MUSIC CATEGORIES AUTHORIZATION
export const ActionGetMusic: Action = {
  id: 'action_get_music_id',
  tag: 'GET_MUSIC_CATEGORY',
  name: 'OBTENIR CATEGORIE MUSIQUE',
  description: 'A les privilèges pour obtenir une categorie de musique',
};

export const ActionCreateMusic: Action = {
  id: 'action_create_music_id',
  tag: 'CREATE_MUSIC_CATEGORY',
  name: 'CRÉER CATEGORIE MUSIQUE',
  description: 'A les privilèges pour créer une categorie de musique',
};

export const ActionDeleteMusic: Action = {
  id: 'action_delete_music_id',
  tag: 'DELETE_MUSIC_CATEGORY',
  name: 'SUPPRIMER MUSIQUE',
  description: 'A les privilèges pour supprimer une categorie de musique',
};

export const ActionUpdateMusic: Action = {
  id: 'action_update_music_id',
  tag: 'UPDATE_MUSIC_CATEGORY',
  name: 'METTRE À JOUR CATEGORIE MUSIQUE',
  description: 'A les privilèges pour mettre à jour une categorie de musique',
};

// FEE TYPE AUTHORIZATION
export const ActionGetFeeType: Action = {
  id: 'action_get_fee_type_id',
  tag: 'GET_FEE_TYPE',
  name: 'OBTENIR TYPE DE FRAIS',
  description: 'A les privilèges pour obtenir un type de frais',
};

export const ActionCreateFeeType: Action = {
  id: 'action_create_fee_type_id',
  tag: 'CREATE_FEE_TYPE',
  name: 'CRÉER TYPE DE FRAIS',
  description: 'A les privilèges pour créer un type de frais',
};

export const ActionDeleteFeeType: Action = {
  id: 'action_delete_fee_type_id',
  tag: 'DELETE_FEE_TYPE',
  name: 'SUPPRIMER TYPE DE FRAIS',
  description: 'A les privilèges pour supprimer un type de frais',
};

export const ActionUpdateFeeType: Action = {
  id: 'action_update_fee_type_id',
  tag: 'UPDATE_FEE_TYPE',
  name: 'METTRE À JOUR TYPE DE FRAIS',
  description: 'A les privilèges pour mettre à jour un type de frais',
};

// ROLE AUTHORIZATION
export const ActionGetRole: Action = {
  id: 'action_get_role_id',
  tag: 'GET_ROLE',
  name: 'OBTENIR RÔLE',
  description: 'A les privilèges pour obtenir un rôle',
};

export const ActionCreateRole: Action = {
  id: 'action_create_role_id',
  tag: 'CREATE_ROLE',
  name: 'CRÉER RÔLE',
  description: 'A les privilèges pour créer un rôle',
};

export const ActionDeleteRole: Action = {
  id: 'action_delete_role_id',
  tag: 'DELETE_ROLE',
  name: 'SUPPRIMER RÔLE',
  description: 'A les privilèges pour supprimer un rôle',
};

export const ActionUpdateRole: Action = {
  id: 'action_update_role_id',
  tag: 'UPDATE_ROLE',
  name: 'METTRE À JOUR RÔLE',
  description: 'A les privilèges pour mettre à jour un rôle',
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
  ActionGetMusic,
  ActionCreateMusic,
  ActionDeleteMusic,
  ActionUpdateMusic,
  ActionGetFeeType,
  ActionCreateFeeType,
  ActionDeleteFeeType,
  ActionUpdateFeeType,
  ActionGetRole,
  ActionCreateRole,
  ActionDeleteRole,
  ActionUpdateRole,
];
