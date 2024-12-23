import { TimeSlotStatus } from '@prisma/client';
import { TimeSlotWithIncluded } from 'src/time-slot/types/time-slot-with-included.type';
import { UserTeacherOne } from './user.test-utils';

// Get today's date
const today = new Date();

// Calculate tomorrow's date
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

function getTomorrowDate(dateString: string): string {
  const year = tomorrow.getFullYear();
  const month = tomorrow.getMonth() + 1; // Months are 0-indexed
  const day = tomorrow.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${dateString}`;
}

export const TeacherOneTimeSlotOne: TimeSlotWithIncluded = {
  id: 'time_slot_one_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('08:00:00')),
  end: new Date(getTomorrowDate('08:30:00')),
};

export const TeacherOneTimeSlotTwo: TimeSlotWithIncluded = {
  id: 'time_slot_two_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('08:30:00')),
  end: new Date(getTomorrowDate('09:00:00')),
};

export const TeacherOneTimeSlotThree: TimeSlotWithIncluded = {
  id: 'time_slot_three_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('09:00:00')),
  end: new Date(getTomorrowDate('09:30:00')),
};

export const TeacherOneTimeSlotFour: TimeSlotWithIncluded = {
  id: 'time_slot_four_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('09:30:00')),
  end: new Date(getTomorrowDate('10:00:00')),
};

export const TeacherOneTimeSlotFive: TimeSlotWithIncluded = {
  id: 'time_slot_five_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('10:00:00')),
  end: new Date(getTomorrowDate('10:30:00')),
};

export const TeacherOneTimeSlotSix: TimeSlotWithIncluded = {
  id: 'time_slot_six_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('10:30:00')),
  end: new Date(getTomorrowDate('11:00:00')),
};

export const TeacherOneTimeSlotSeven: TimeSlotWithIncluded = {
  id: 'time_slot_seven_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('11:00:00')),
  end: new Date(getTomorrowDate('11:30:00')),
};

export const TeacherOneTimeSlotEight: TimeSlotWithIncluded = {
  id: 'time_slot_eight_id',
  status: TimeSlotStatus.AVAILABLE,
  teacherId: UserTeacherOne.id,
  teacher: UserTeacherOne,
  reservations: [],
  start: new Date(getTomorrowDate('11:30:00')),
  end: new Date(getTomorrowDate('12:00:00')),
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
