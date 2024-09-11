import { Injectable, NotFoundException } from '@nestjs/common';
import { Setting } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingInput } from './dto/update-setting.input';

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

  async updateSetting(
    updateSettingInput: UpdateSettingInput,
  ): Promise<Setting> {
    const { id, ...otherUpdateSettingInputProperty } = updateSettingInput;
    return this.prisma.setting.update({
      where: {
        id,
      },
      data: otherUpdateSettingInputProperty,
    });
  }
}
