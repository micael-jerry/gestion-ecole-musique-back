import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Setting } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../src/prisma/prisma.service';
import { SettingService } from '../../src/setting/setting.service';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';

describe('SettingService', () => {
  let service: SettingService;
  let prisma: PrismaService;
  let historyService: HistoryService;
  const JWT_PAYLOAD: JwtPayloadType = {
    userId: 'userId',
    roleName: 'roleName',
    actionTags: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            setting: {
              findUnique: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'fetch one Setting',
                value: 100,
              }),
              findMany: jest.fn().mockResolvedValue([]),
              create: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'create Setting',
                value: 100,
              }),
              update: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'Updated Setting',
                value: 50000,
              }),
              delete: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'delete Setting',
                value: 50000,
              }),
            },
          },
        },
        {
          provide: HistoryService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SettingService>(SettingService);
    prisma = module.get<PrismaService>(PrismaService);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSetting', () => {
    it('should return an array of settings', async () => {
      const result: Setting[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          name: 'droit',
          value: 450000,
          description: 'droit',
          tag: 'DROIT',
        },
      ];
      jest.spyOn(prisma.setting, 'findMany').mockResolvedValue(result);

      const settings = await service.getAllSetting();
      expect(settings).toEqual(result);
      expect(prisma.setting.findMany).toHaveBeenCalled();
    });
  });

  describe('getSettingById', () => {
    it('should return a single setting by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const result: Setting = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'droit',
        value: 450000,
        description: 'droit',
        tag: 'DROIT',
      };
      jest.spyOn(prisma.setting, 'findUnique').mockResolvedValue(result);

      const settings = await service.getSettingById(id);
      expect(settings).toEqual(result);
      expect(prisma.setting.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if no setting is found by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.setting, 'findUnique')
        .mockRejectedValue(
          new NotFoundException(`setting with ID "${id}" not found`),
        );

      await expect(service.getSettingById(id)).rejects.toThrow(
        `setting with ID "${id}" not found`,
      );
      expect(prisma.setting.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('updateSetting', () => {
    it('should update and return the setting', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const updateSettingInput = {
        id,
        name: 'Updated Setting',
        value: 50000,
        description: 'updated',
        tag: 'UPDATED',
      };
      const result: Setting = { ...updateSettingInput };

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.setting, 'update').mockResolvedValue(result);

      const updatedSetting = await service.updateSetting(
        updateSettingInput,
        JWT_PAYLOAD,
      );

      expect(updatedSetting).toEqual(result);
      expect(historyService.create).toHaveBeenCalledTimes(1);
      expect(prisma.setting.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          name: updateSettingInput.name,
          value: updateSettingInput.value,
          description: updateSettingInput.description,
          tag: updateSettingInput.tag,
        },
      });
    });

    it('should throw an error if the setting does not exist', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const updateSettingInput = {
        id,
        name: 'Non-existent Setting',
        value: 40000,
        description: null,
      };

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest
        .spyOn(prisma.setting, 'update')
        .mockRejectedValue(new Error('Setting not found'));

      await expect(
        service.updateSetting(updateSettingInput, JWT_PAYLOAD),
      ).rejects.toThrow('Setting not found');
      expect(prisma.setting.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          name: updateSettingInput.name,
          value: updateSettingInput.value,
          description: updateSettingInput.description,
        },
      });
    });
  });
});
