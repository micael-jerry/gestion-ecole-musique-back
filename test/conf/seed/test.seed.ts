import { Prisma, PrismaClient, Role } from '@prisma/client';
import { FeeTypeOne, FeeTypeTwo } from '../test-utils/fee-type.test-utils';
import {
  CourseFive,
  CourseFour,
  CourseOne,
  CourseSix,
  CourseThree,
  CourseTwo,
} from '../test-utils/course.test-utils';
import { SettingOne } from '../test-utils/setting.test-utils';
import {
  RoleAdmin,
  RoleManager,
  RoleStudent,
  RoleTeacher,
} from '../test-utils/role.test-utils';
import { AllUser } from '../test-utils/user.test-utils';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';
import { AllAction } from '../test-utils/action.test-utils';
import { RoleWithIncluded } from 'src/role/types/role-with-included.type';
import { AllHistory } from '../test-utils/history.test-utils';
import { HistoryWithIncluded } from '../../../src/history/types/history-with-included.type';
import { TeacherOneAllTimeSlot } from '../test-utils/time-slot.test-utils';
import { DefaultArgs } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

const seederTestRole = async (
  p: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  roleWithIncludedList: RoleWithIncluded[],
) => {
  roleWithIncludedList.forEach(async (roleWithIncluded) => {
    const role: Role = {
      id: roleWithIncluded.id,
      name: roleWithIncluded.name,
    };
    await p.role.create({
      data: { ...role, actions: { connect: [...roleWithIncluded.actions] } },
    });
  });
};

const seederTestUser = async (
  p: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  userWithIncludedList: UserWithIncluded[],
) => {
  userWithIncludedList.forEach(async (userWithIncluded) => {
    const user: Prisma.UserUncheckedCreateInput = {
      id: userWithIncluded.id,
      roleId: userWithIncluded.roleId,
      firstname: userWithIncluded.firstname,
      lastname: userWithIncluded.lastname,
      email: userWithIncluded.email,
      password: userWithIncluded.password,
      address: userWithIncluded.address,
      phone: userWithIncluded.phone,
      picture: userWithIncluded.picture,
      description: userWithIncluded.description,
      isArchive: userWithIncluded.isArchive,
    };
    await p.user.create({
      data: {
        ...user,
        courses: { connect: [...userWithIncluded.courses] },
      },
    });
  });
};

export const seederTest = async () => {
  await prisma.$transaction(async (tx) => {
    // seed action
    await tx.action.createMany({ data: AllAction });
    // seed role
    await seederTestRole(tx, [
      RoleAdmin,
      RoleManager,
      RoleTeacher,
      RoleStudent,
    ]);
    // seed feeType
    await tx.feeType.createMany({
      data: [FeeTypeOne, FeeTypeTwo].map(
        ({ id, name, description, value }) => ({
          id,
          name,
          description,
          value,
        }),
      ),
    });
    // seed course
    await tx.course.createMany({
      data: [
        CourseOne,
        CourseTwo,
        CourseThree,
        CourseFour,
        CourseFive,
        CourseSix,
      ],
    });
    // seed setting
    await tx.setting.create({ data: SettingOne });
    // seed user
    await seederTestUser(tx, AllUser);
    // seed history
    await tx.history.createMany({
      data: AllHistory.map(
        ({
          id,
          entityId,
          entityType,
          operationType,
          userId,
          createdAt,
        }: HistoryWithIncluded) => ({
          id,
          entityId,
          entityType,
          operationType,
          userId,
          createdAt,
        }),
      ),
    });

    // seed time slots
    await tx.timeSlot.createMany({
      data: TeacherOneAllTimeSlot.map(
        ({ id, status, start, end, teacherId }) => ({
          id,
          status,
          start,
          end,
          teacherId,
        }),
      ),
    });
  });
  await prisma.$disconnect();
};

seederTest()
  .then(() => {
    console.log('database seed test finished');
  })
  .catch(async (err) => {
    await prisma.$disconnect();
    throw err;
  });
