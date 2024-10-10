import { TimeSlotStatus } from '@prisma/client';
import { TimeSlotWithIncluded } from 'src/time-slot/types/time-slot-with-included.type';
import { UserTeacherOne } from './user.test-utils';

export const TeacherOneTimeSlotOne: TimeSlotWithIncluded = {
  id: 'time_slot_one_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T08:00:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T08:30:00Z`),
};

export const TeacherOneTimeSlotTwo: TimeSlotWithIncluded = {
  id: 'time_slot_two_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T08:30:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T09:00:00Z`),
};

export const TeacherOneTimeSlotThree: TimeSlotWithIncluded = {
  id: 'time_slot_three_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T09:00:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T09:30:00Z`),
};

export const TeacherOneTimeSlotFour: TimeSlotWithIncluded = {
  id: 'time_slot_four_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T09:30:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T10:00:00Z`),
};

export const TeacherOneTimeSlotFive: TimeSlotWithIncluded = {
  id: 'time_slot_five_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T10:00:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T10:30:00Z`),
};

export const TeacherOneTimeSlotSix: TimeSlotWithIncluded = {
  id: 'time_slot_six_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T10:30:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T11:00:00Z`),
};

export const TeacherOneTimeSlotSeven: TimeSlotWithIncluded = {
  id: 'time_slot_seven_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T11:00:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T11:30:00Z`),
};

export const TeacherOneTimeSlotEight: TimeSlotWithIncluded = {
  id: 'time_slot_eight_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  start: new Date(`${new Date().getFullYear() + 1}-01-05T11:30:00Z`),
  end: new Date(`${new Date().getFullYear() + 1}-01-05T12:00:00Z`),
};

export const TeacherOneAllTimeSlot: TimeSlotWithIncluded[] = [
  TeacherOneTimeSlotOne,
  TeacherOneTimeSlotTwo,
  TeacherOneTimeSlotThree,
  TeacherOneTimeSlotFour,
  TeacherOneTimeSlotFive,
  TeacherOneTimeSlotSix,
  TeacherOneTimeSlotSeven,
  TeacherOneTimeSlotEight,
];
