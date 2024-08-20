import { MusicCategory, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MusicCategoryService } from './music-category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('MusicCategoryService', () => {
  let service: MusicCategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicCategoryService,
        {
          provide: PrismaService,
          useValue: {
            musicCategory: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MusicCategoryService>(MusicCategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMusicCategory', () => {
    it('should create a new music category and return it', async () => {
      const createMusicCategoryInput = {
        name: 'music category',
        description: 'create music category',
      } satisfies Prisma.MusicCategoryCreateInput;

      const result: MusicCategory = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        ...createMusicCategoryInput,
      };
      jest.spyOn(prisma.musicCategory, 'create').mockResolvedValue(result);

      const musicCategory = await service.create(createMusicCategoryInput);

      expect(musicCategory).toEqual(result);
      expect(prisma.musicCategory.create).toHaveBeenCalledWith({
        data: createMusicCategoryInput,
      });
    });
  });

  describe('findAllMusicCategory', () => {
    it('should return an array of music category', async () => {
      const result: MusicCategory[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          name: 'music category',
          description: 'music category description',
        },
      ];
      jest.spyOn(prisma.musicCategory, 'findMany').mockResolvedValue(result);

      const musicCategory = await service.findAll();
      expect(musicCategory).toEqual(result);
      expect(prisma.musicCategory.findMany).toHaveBeenCalled();
    });
  });

  describe('findByIdMusicCategory', () => {
    it('should return a single music category by ID', async () => {
      const result: MusicCategory = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'music category',
        description: 'music category description',
      };
      jest.spyOn(prisma.musicCategory, 'findUnique').mockResolvedValue(result);

      const musicCategory = await service.findById(
        '0cdd1713-d391-451c-b60b-0ecefb22c049',
      );
      expect(musicCategory).toEqual(result);
      expect(prisma.musicCategory.findUnique).toHaveBeenCalled();
    });

    it('should return null if no music category is found by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.musicCategory, 'findUnique')
        .mockRejectedValue(
          new NotFoundException(`music category with ID "${id}" not found`),
        );

      await expect(service.findById(id)).rejects.toThrow(
        `music category with ID "${id}" not found`,
      );
      expect(prisma.musicCategory.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('updateMusicCategory', () => {
    it('should update and return the music category', async () => {
      const updateMusicCategoryInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Updated music category',
        description: 'Updated music category description',
      };

      const result: MusicCategory = { ...updateMusicCategoryInput };

      jest.spyOn(prisma.musicCategory, 'update').mockResolvedValue(result);

      const updatedMusicCategory = await service.update(
        updateMusicCategoryInput,
      );
      expect(updatedMusicCategory).toEqual(result);
      expect(prisma.musicCategory.update).toHaveBeenCalledWith({
        where: { id: updateMusicCategoryInput.id },
        data: updateMusicCategoryInput,
      });
    });

    it('should throw an error if the music category does not exist', async () => {
      const updateMusicCategoryInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Music category',
        description: 'Music category description',
      };

      jest
        .spyOn(prisma.musicCategory, 'update')
        .mockRejectedValue(new Error('Music category not found'));

      await expect(service.update(updateMusicCategoryInput)).rejects.toThrow(
        'Music category not found',
      );
      expect(prisma.musicCategory.update).toHaveBeenCalledWith({
        where: { id: updateMusicCategoryInput.id },
        data: updateMusicCategoryInput,
      });
    });
  });

  describe('deleteMusicCategory', () => {
    it('should delete and return the music category deleted', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      const result: MusicCategory = {
        id,
        name: 'delete music category',
        description: 'delete music category description',
      };

      jest.spyOn(prisma.musicCategory, 'delete').mockResolvedValue(result);

      const deleteMusicCategory = await service.remove(id);
      expect(deleteMusicCategory).toEqual(result);
      expect(prisma.musicCategory.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return not found exception if no music category is found ', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.musicCategory, 'delete')
        .mockRejectedValue(
          new NotFoundException(`Music category with id ${id} does not exist`),
        );

      await expect(service.remove(id)).rejects.toThrow(
        `Music category with id ${id} does not exist`,
      );
      expect(prisma.musicCategory.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
