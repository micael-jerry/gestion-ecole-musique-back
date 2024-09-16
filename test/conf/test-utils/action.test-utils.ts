import { Action } from '@prisma/client';

// ADMIN AUTHORIZATION
export const ActionGetAdmin: Action = {
  id: 'action_get_admin_id',
  tag: 'GET_ADMIN',
  name: 'OBTENIR ADMIN',
  description: 'A les privilèges pour obtenir un admin',
};

export const ActionCreateAdmin: Action = {
  id: 'action_create_admin_id',
  tag: 'CREATE_ADMIN',
  name: 'CRÉER ADMIN',
  description: 'A les privilèges pour créer un admin',
};

export const ActionDeleteAdmin: Action = {
  id: 'action_delete_admin_id',
  tag: 'DELETE_ADMIN',
  name: 'SUPPRIMER ADMIN',
  description: 'A les privilèges pour supprimer un admin',
};

export const ActionUpdateAdmin: Action = {
  id: 'action_update_admin_id',
  tag: 'UPDATE_ADMIN',
  name: 'METTRE À JOUR ADMIN',
  description: 'A les privilèges pour mettre à jour un admin',
};

// MANAGER AUTHORIZATION
export const ActionGetManager: Action = {
  id: 'action_get_manager_id',
  tag: 'GET_MANAGER',
  name: 'OBTENIR MANAGER',
  description: 'A les privilèges pour obtenir un manager',
};

export const ActionCreateManager: Action = {
  id: 'action_create_manager_id',
  tag: 'CREATE_MANAGER',
  name: 'CRÉER MANAGER',
  description: 'A les privilèges pour créer un manager',
};

export const ActionDeleteManager: Action = {
  id: 'action_delete_manager_id',
  tag: 'DELETE_MANAGER',
  name: 'SUPPRIMER MANAGER',
  description: 'A les privilèges pour supprimer un manager',
};

export const ActionUpdateManager: Action = {
  id: 'action_update_manager_id',
  tag: 'UPDATE_MANAGER',
  name: 'METTRE À JOUR MANAGER',
  description: 'A les privilèges pour mettre à jour un manager',
};

// SETTING AUTHORIZATION
export const ActionGetSetting: Action = {
  id: 'action_get_setting_id',
  tag: 'GET_SETTING',
  name: 'GET SETTING',
  description: 'Has privileges to get setting',
};

export const ActionUpdateSetting: Action = {
  id: 'action_update_setting_id',
  tag: 'UPDATE_SETTING',
  name: 'UPDATE SETTING',
  description: 'Has privileges to update setting',
};

// MUSIC CATEGORIES AUTHORIZATION
export const ActionGetMusic: Action = {
  id: 'action_get_music_id',
  tag: 'GET_MUSIC',
  name: 'GET MUSIC',
  description: 'Has privileges to get music',
};

export const ActionCreateMusic: Action = {
  id: 'action_create_music_id',
  tag: 'CREATE_MUSIC',
  name: 'CREATE MUSIC',
  description: 'Has privileges to create music',
};

export const ActionDeleteMusic: Action = {
  id: 'action_delete_music_id',
  tag: 'DELETE_MUSIC',
  name: 'DELETE MUSIC',
  description: 'Has privileges to delete music',
};

export const ActionUpdateMusic: Action = {
  id: 'action_update_music_id',
  tag: 'UPDATE_MUSIC',
  name: 'UPDATE MUSIC',
  description: 'Has privileges to update music',
};

// FEE TYPE AUTHORIZATION
export const ActionGetFeeType: Action = {
  id: 'action_get_fee_type_id',
  tag: 'GET_FEE_TYPE',
  name: 'GET FEE TYPE',
  description: 'Has privileges to get fee type',
};

export const ActionCreateFeeType: Action = {
  id: 'action_create_fee_type_id',
  tag: 'CREATE_FEE_TYPE',
  name: 'CREATE FEE TYPE',
  description: 'Has privileges to create fee type',
};

export const ActionDeleteFeeType: Action = {
  id: 'action_delete_fee_type_id',
  tag: 'DELETE_FEE_TYPE',
  name: 'DELETE FEE TYPE',
  description: 'Has privileges to delete fee type',
};

export const ActionUpdateFeeType: Action = {
  id: 'action_update_fee_type_id',
  tag: 'UPDATE_FEE_TYPE',
  name: 'UPDATE FEE TYPE',
  description: 'Has privileges to update fee type',
};

// ROLE AUTHORIZATION
export const ActionGetRole: Action = {
  id: 'action_get_role_id',
  tag: 'GET_ROLE',
  name: 'GET ROLE',
  description: 'Has privileges to get role',
};

export const ActionCreateRole: Action = {
  id: 'action_create_role_id',
  tag: 'CREATE_ROLE',
  name: 'CREATE ROLE',
  description: 'Has privileges to create role',
};

export const ActionDeleteRole: Action = {
  id: 'action_delete_role_id',
  tag: 'DELETE_ROLE',
  name: 'DELETE ROLE',
  description: 'Has privileges to delete role',
};

export const ActionUpdateRole: Action = {
  id: 'action_update_role_id',
  tag: 'UPDATE_ROLE',
  name: 'UPDATE ROLE',
  description: 'Has privileges to update role',
};

export const AllAction: Action[] = [
  ActionGetAdmin,
  ActionCreateAdmin,
  ActionDeleteAdmin,
  ActionUpdateAdmin,
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
