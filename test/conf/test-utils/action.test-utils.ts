import { Action } from '@prisma/client';

// USER AUTHORIZATION
export const ActionGetUser: Action = {
  id: 'action_get_user_id',
  tag: 'GET_USER',
  name: 'GET USER',
  description: 'Has privileges to get user',
};

export const ActionCreateUser: Action = {
  id: 'action_create_user_id',
  tag: 'CREATE_USER',
  name: 'CREATE USER',
  description: 'Has privileges to create user',
};

export const ActionDeleteUser: Action = {
  id: 'action_delete_user_id',
  tag: 'DELETE_USER',
  name: 'DELETE USER',
  description: 'Has privileges to delete user',
};

export const ActionUpdateUser: Action = {
  id: 'action_update_user_id',
  tag: 'UPDATE_USER',
  name: 'UPDATE USER',
  description: 'Has privileges to update user',
};

// SETTING AUTHORIZATION
export const ActionGetSetting: Action = {
  id: 'action_get_setting_id',
  tag: 'GET_SETTING',
  name: 'GET SETTING',
  description: 'Has privileges to get setting',
};

export const ActionCreateSetting: Action = {
  id: 'action_create_setting_id',
  tag: 'CREATE_SETTING',
  name: 'CREATE SETTING',
  description: 'Has privileges to create setting',
};

export const ActionDeleteSetting: Action = {
  id: 'action_delete_setting_id',
  tag: 'DELETE_SETTING',
  name: 'DELETE SETTING',
  description: 'Has privileges to delete setting',
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
  ActionGetUser,
  ActionCreateUser,
  ActionDeleteUser,
  ActionUpdateUser,
  ActionGetSetting,
  ActionCreateSetting,
  ActionDeleteSetting,
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
