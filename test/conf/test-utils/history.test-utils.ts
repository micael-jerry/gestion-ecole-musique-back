import { OperationType, EntityType } from '@prisma/client';
import {
  CourseOne,
  CourseTwo,
  CourseThree,
  CourseFour,
  CourseFive,
  CourseSix,
} from './course.test-utils';
import {
  UserAdminOne,
  UserAdminTwo,
  UserManagerOne,
  UserManagerTwo,
  UserStudentOne,
  UserStudentTwo,
  UserTeacherOne,
} from './user.test-utils';
import { FeeTypeOne, FeeTypeTwo } from './fee-type.test-utils';
import { SettingOne } from './setting.test-utils';
import { HistoryWithIncluded } from 'src/history/types/history-with-included.type';

export const HistoryCourseOne: HistoryWithIncluded = {
  id: 'history_course_one_id',
  entityId: CourseOne.id,
  entityType: EntityType.COURSE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  entity: CourseOne as unknown as JSON,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-02-15T10:20:30Z'),
};

export const HistoryCourseTwo: HistoryWithIncluded = {
  id: 'history_course_two_id',
  entityId: CourseTwo.id,
  entity: CourseTwo as unknown as JSON,
  entityType: EntityType.COURSE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-04-10T12:30:45Z'),
};

export const HistoryCourseThree: HistoryWithIncluded = {
  id: 'history_course_three_id',
  entityId: CourseThree.id,
  entity: CourseThree as unknown as JSON,
  entityType: EntityType.COURSE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-06-05T14:50:15Z'),
};

export const HistoryCourseFour: HistoryWithIncluded = {
  id: 'history_course_four_id',
  entityId: CourseFour.id,
  entity: CourseFour as unknown as JSON,
  entityType: EntityType.COURSE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-08-20T09:40:10Z'),
};

export const HistoryCourseFive: HistoryWithIncluded = {
  id: 'history_course_five_id',
  entityId: CourseFive.id,
  entity: CourseFive as unknown as JSON,
  entityType: EntityType.COURSE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-09-10T11:15:25Z'),
};

export const HistoryCourseSix: HistoryWithIncluded = {
  id: 'history_course_six_id',
  entityId: CourseSix.id,
  entity: CourseSix as unknown as JSON,
  entityType: EntityType.COURSE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-09-28T16:35:50Z'),
};

export const HistoryFeeTypeOne: HistoryWithIncluded = {
  id: 'history_fee_type_one_id',
  entityId: FeeTypeOne.id,
  entity: FeeTypeOne as unknown as JSON,
  entityType: EntityType.FEE_TYPE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-01-10T09:25:30Z'),
};

export const HistoryFeeTypeTwo: HistoryWithIncluded = {
  id: 'history_fee_type_two_id',
  entityId: FeeTypeTwo.id,
  entity: FeeTypeTwo as unknown as JSON,
  entityType: EntityType.FEE_TYPE,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-03-15T11:45:20Z'),
};

export const HistorySettingOne: HistoryWithIncluded = {
  id: 'history_setting_one_id',
  entityId: SettingOne.id,
  entity: SettingOne as unknown as JSON,
  entityType: EntityType.SETTING,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-05-20T08:15:45Z'),
};

export const HistoryUserOne: HistoryWithIncluded = {
  id: 'history_user_one_id',
  entityId: UserAdminOne.id,
  entity: UserAdminOne as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-02-10T08:30:00Z'),
};

export const HistoryUserTwo: HistoryWithIncluded = {
  id: 'history_user_two_id',
  entityId: UserAdminTwo.id,
  entity: UserAdminTwo as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-03-20T14:15:00Z'),
};

export const HistoryUserThree: HistoryWithIncluded = {
  id: 'history_user_three_id',
  entityId: UserManagerOne.id,
  entity: UserManagerOne as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-04-15T10:00:00Z'),
};

export const HistoryUserFour: HistoryWithIncluded = {
  id: 'history_user_four_id',
  entityId: UserManagerTwo.id,
  entity: UserManagerTwo as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-05-25T16:30:00Z'),
};

export const HistoryUserFive: HistoryWithIncluded = {
  id: 'history_user_five_id',
  entityId: UserStudentOne.id,
  entity: UserStudentOne as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-06-01T12:00:00Z'),
};

export const HistoryUserSix: HistoryWithIncluded = {
  id: 'history_user_six_id',
  entityId: UserTeacherOne.id,
  entity: UserTeacherOne as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.UPDATE,
  createdAt: new Date('2023-07-10T14:45:00Z'),
};

export const HistoryUserSeven: HistoryWithIncluded = {
  id: 'history_user_seven_id',
  entityId: UserStudentTwo.id,
  entity: UserStudentTwo as unknown as JSON,
  entityType: EntityType.USER,
  userId: UserAdminOne.id,
  user: UserAdminOne,
  operationType: OperationType.CREATE,
  createdAt: new Date('2023-08-20T09:30:00Z'),
};

export const AllHistory: HistoryWithIncluded[] = [
  HistoryCourseOne,
  HistoryCourseTwo,
  HistoryCourseThree,
  HistoryCourseFour,
  HistoryCourseFive,
  HistoryCourseSix,
  HistoryFeeTypeOne,
  HistoryFeeTypeTwo,
  HistorySettingOne,
];
