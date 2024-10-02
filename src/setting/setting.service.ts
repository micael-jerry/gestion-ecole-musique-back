import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityType, OperationType, Setting } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingInput } from './dto/update-setting.input';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class SettingService {
  constructor(
    private prisma: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

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
    authenticatedUser: JwtPayloadType,
  ): Promise<Setting> {
    const { id, ...otherUpdateSettingInputProperty } = updateSettingInput;
    return await this.prisma.$transaction(async () => {
      const settingUpdated = await this.prisma.setting.update({
        where: {
          id,
        },
        data: otherUpdateSettingInputProperty,
      });
      await this.historyService.create({
        entityId: settingUpdated.id,
        entityType: EntityType.SETTING,
        operationType: OperationType.UPDATE,
        userId: authenticatedUser.userId,
      });
      return settingUpdated;
    });
  }
}
