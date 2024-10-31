import { ReservationStatus } from '@prisma/client';
import { ReservationWithIncluded } from 'src/reservation/types/reservation-with-included.type';
import { UserStudentOne, UserStudentTwo } from './user.test-utils';
import {
  TeacherOneTimeSlotEight,
  TeacherOneTimeSlotFive,
  TeacherOneTimeSlotFour,
  TeacherOneTimeSlotOne,
  TeacherOneTimeSlotSeven,
  TeacherOneTimeSlotSix,
  TeacherOneTimeSlotThree,
  TeacherOneTimeSlotTwo,
} from './time-slot.test-utils';

export const StudentOneReservation: ReservationWithIncluded = {
  id: 'student_one_reservation_id',
  status: ReservationStatus.PENDING,
  studentId: UserStudentOne.id,
  student: UserStudentOne,
  createdAt: new Date(),
  timeSlots: [
    TeacherOneTimeSlotOne,
    TeacherOneTimeSlotTwo,
    TeacherOneTimeSlotThree,
    TeacherOneTimeSlotFour,
  ],
};

export const StudentTwoReservation: ReservationWithIncluded = {
  id: 'student_two_reservation_id',
  status: ReservationStatus.PENDING,
  studentId: UserStudentTwo.id,
  student: UserStudentTwo,
  createdAt: new Date(),
  timeSlots: [
    TeacherOneTimeSlotFive,
    TeacherOneTimeSlotSix,
    TeacherOneTimeSlotSeven,
    TeacherOneTimeSlotEight,
  ],
};

export const AllReservation: ReservationWithIncluded[] = [
  StudentOneReservation,
  StudentTwoReservation,
];
