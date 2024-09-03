import { PrismaClient } from '@prisma/client';
import { FeeTypeOne, FeeTypeTwo } from '../test-utils/fee-type.test-utils';
import {
  MusicCategoryOne,
  MusicCategoryTwo,
} from '../test-utils/music-category.test-utils';
import { SettingOne } from '../test-utils/setting.test-utils';
import { RoleOne, RoleTwo } from '../test-utils/role.test-utils';
import { UserOne, UserTwo } from '../test-utils/user.test-utils';

const prisma = new PrismaClient();

export const seedTest = async () => {
  await prisma.role.createMany({ data: [RoleOne, RoleTwo] });
  await prisma.feeType.createMany({ data: [FeeTypeOne, FeeTypeTwo] });
  await prisma.musicCategory.createMany({
    data: [MusicCategoryOne, MusicCategoryTwo],
  });
  await prisma.setting.create({ data: SettingOne });
  await prisma.user.create({
    data: { ...UserOne, musicCategories: { connect: [MusicCategoryOne] } },
  });
  await prisma.user.create({
    data: { ...UserTwo, musicCategories: { connect: [MusicCategoryOne] } },
  });
  await prisma.$disconnect();
};

seedTest()
  .then(() => {
    console.log('database seed test finished');
  })
  .catch(async (err) => {
    await prisma.$disconnect();
    throw err;
  });
