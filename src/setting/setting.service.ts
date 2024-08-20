import { Injectable, NotFoundException } from '@nestjs/common';
import { Setting } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingInput, UpdateSettingInput } from './dto/setting.input';

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async getAllSetting(): Promise<Setting[]> {
    const AllSetting = this.prisma.setting.findMany();
    return AllSetting;
  }

  async getSettingById(id: string): Promise<Setting> {
    const found = await this.prisma.setting.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`setting with ID "${id}" not found`);
    }

    return found;
  }

  async createSetting(
    createSettingInput: CreateSettingInput,
  ): Promise<Setting> {
    const { name, value } = createSettingInput;

    const setting = this.prisma.setting.create({
      data: {
        name,
        value,
      },
    });

    return setting;
  }

  async updateSetting(
    updateSettingInput: UpdateSettingInput,
  ): Promise<Setting> {
    const { id, name, value } = updateSettingInput;
    const found = await this.getSettingById(id);
    if (found) {
      return this.prisma.setting.update({
        where: {
          id,
        },
        data: { name, value },
      });
    }
  }

  async deleteSetting(id: string): Promise<Setting> {
    const found = await this.getSettingById(id);
    if (found) {
      return this.prisma.setting.delete({
        where: {
          id,
        },
      });
    }
  }
}
