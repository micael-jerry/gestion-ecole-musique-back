import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicCategoryInput } from './dto/create-music-category.input';
import { UpdateMusicCategoryInput } from './dto/update-music-category.input';
import { PrismaService } from '../prisma/prisma.service';
import { MusicCategory } from '@prisma/client';

@Injectable()
export class MusicCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createMusicCategoryInput: CreateMusicCategoryInput,
  ): Promise<MusicCategory> {
    return await this.prismaService.musicCategory.create({
      data: createMusicCategoryInput,
    });
  }

  async findAll(): Promise<MusicCategory[]> {
    return await this.prismaService.musicCategory.findMany();
  }

  async findById(id: string): Promise<MusicCategory> {
    const musicCategory = await this.prismaService.musicCategory.findUnique({
      where: { id: id },
    });
    if (!musicCategory) {
      throw new NotFoundException(
        `Music category with id ${id} does not exist`,
      );
    }
    return musicCategory;
  }

  async update(
    updateMusicCategoryInput: UpdateMusicCategoryInput,
  ): Promise<MusicCategory> {
    return await this.prismaService.musicCategory.update({
      where: { id: updateMusicCategoryInput.id },
      data: updateMusicCategoryInput,
    });
  }

  async remove(id: string): Promise<MusicCategory> {
    return await this.prismaService.musicCategory.delete({
      where: { id: id },
    });
  }
}
