import { PrismaClient, Role, User } from '@prisma/client';
import { FeeTypeOne, FeeTypeTwo } from '../test-utils/fee-type.test-utils';
import {
  MusicCategoryOne,
  MusicCategoryTwo,
} from '../test-utils/music-category.test-utils';
import { SettingOne } from '../test-utils/setting.test-utils';
import { RoleAdmin, RoleManager } from '../test-utils/role.test-utils';
import {
  UserFive,
  UserFour,
  UserOne,
  UserSix,
  UserThree,
  UserTwo,
} from '../test-utils/user.test-utils';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';
import { AllAction } from '../test-utils/action.test-utils';
import { RoleWithIncluded } from 'src/role/types/role-with-included.type';

const prisma = new PrismaClient();

const seederTestRole = async (
  p: PrismaClient,
  roleWithIncluded: RoleWithIncluded,
) => {
  const role: Role = {
    id: roleWithIncluded.id,
    name: roleWithIncluded.name,
  };
  await p.role.create({
    data: { ...role, actions: { connect: [...roleWithIncluded.actions] } },
  });
};

const seederTestUser = async (
  p: PrismaClient,
  userWithIncluded: UserWithIncluded,
) => {
  const user: User = {
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
      musicCategories: { connect: [...userWithIncluded.musicCategories] },
    },
  });
};

export const seederTest = async () => {
  await prisma.$transaction(async () => {
    // seed action
    await prisma.action.createMany({ data: AllAction });
    // seed role
    await seederTestRole(prisma, RoleAdmin);
    await seederTestRole(prisma, RoleManager);
    // seed feeType
    await prisma.feeType.createMany({ data: [FeeTypeOne, FeeTypeTwo] });
    // seed musicCategory
    await prisma.musicCategory.createMany({
      data: [MusicCategoryOne, MusicCategoryTwo],
    });
    // seed setting
    await prisma.setting.create({ data: SettingOne });
    // seed user
    await seederTestUser(prisma, UserOne);
    await seederTestUser(prisma, UserTwo);
    await seederTestUser(prisma, UserThree);
    await seederTestUser(prisma, UserFour);
    await seederTestUser(prisma, UserFive);
    await seederTestUser(prisma, UserSix);
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
