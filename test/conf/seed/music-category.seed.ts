import { PrismaClient } from '@prisma/client';
import {
  MusicCategoryOne,
  MusicCategoryTwo,
} from '../test-utils/music-category.test-utils';

const prisma = new PrismaClient();

export const seedMusicCategory = async () => {
  await prisma.musicCategory.createMany({
    data: [MusicCategoryOne, MusicCategoryTwo],
  });
};
