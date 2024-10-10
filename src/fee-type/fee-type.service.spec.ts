import { FeeType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FeeTypeService } from './fee-type.service';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { FeeTypeWithIncluded } from './types/fee-type-with-included.type';
import { FeeTypeOne } from '../../test/conf/test-utils/fee-type.test-utils';

describe('FeeTypeService', () => {
  let service: FeeTypeService;
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
        FeeTypeService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            feeType: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
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

    service = module.get<FeeTypeService>(FeeTypeService);
    prisma = module.get<PrismaService>(PrismaService);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFeeType', () => {
    it('should create a new fee type and return it', async () => {
      const createFeeTypeInput = {
        name: 'fee type',
        description: 'create fee type',
        value: 0,
      } satisfies Prisma.FeeTypeCreateInput;

      const result: FeeType = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        isDeleted: false,
        ...createFeeTypeInput,
      };
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.feeType, 'create').mockResolvedValue(result);

      const feeType = await service.create(createFeeTypeInput, JWT_PAYLOAD);

      expect(feeType).toEqual(result);
      expect(historyService.create).toHaveBeenCalledTimes(1);
      expect(prisma.feeType.create).toHaveBeenCalledWith({
        data: createFeeTypeInput,
        include: { payments: true },
      });
    });
  });

  describe('findAllFeeType', () => {
    it('should return an array of fee type', async () => {
      const result: FeeType[] = [FeeTypeOne];
      jest.spyOn(prisma.feeType, 'findMany').mockResolvedValue(result);

      const feeType = await service.findAll();
      expect(feeType).toEqual(result);
      expect(prisma.feeType.findMany).toHaveBeenCalled();
    });
  });

  describe('findByIdFeeType', () => {
    it('should return a single fee type by ID', async () => {
      const result: FeeTypeWithIncluded = FeeTypeOne;
      jest.spyOn(prisma.feeType, 'findUnique').mockResolvedValue(result);

      const feeType = await service.findById(FeeTypeOne.id);
      expect(feeType).toEqual(result);
      expect(prisma.feeType.findUnique).toHaveBeenCalled();
    });

    it('should return error if no fee type is found by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.feeType, 'findUnique')
        .mockRejectedValue(
          new NotFoundException(`Fee type with id ${id} does not exist`),
        );

      await expect(service.findById(id)).rejects.toThrow(
        `Fee type with id ${id} does not exist`,
      );
      expect(prisma.feeType.findUnique).toHaveBeenCalledWith({
        where: { id, isDeleted: false },
        include: { payments: true },
      });
    });
  });

  describe('updateFeeType', () => {
    it('should update and return the fee type', async () => {
      const updateFeeTypeInput = {
        id: FeeTypeOne.id,
        name: 'Updated fee type',
        description: 'Updated fee type description',
      };

      const result: FeeTypeWithIncluded = {
        ...updateFeeTypeInput,
        value: 0,
        isDeleted: false,
        payments: [],
      };

      jest.spyOn(service, 'findById').mockResolvedValue(FeeTypeOne);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.feeType, 'update').mockResolvedValue(result);

      const updatedFeeType = await service.update(
        updateFeeTypeInput,
        JWT_PAYLOAD,
      );
      expect(updatedFeeType).toEqual(result);
      expect(historyService.create).toHaveBeenCalledTimes(1);
      expect(prisma.feeType.update).toHaveBeenCalledWith({
        where: { id: updateFeeTypeInput.id, isDeleted: false },
        data: updateFeeTypeInput,
        include: { payments: true },
      });
    });

    it('should throw an error if the fee type does not exist', async () => {
      const updateFeeTypeInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Fee Type',
        description: 'Fee Type description',
      };

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new Error('Fee type not found'));

      await expect(
        service.update(updateFeeTypeInput, JWT_PAYLOAD),
      ).rejects.toThrow('Fee type not found');
      expect(prisma.feeType.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteFeeType', () => {
    it('should delete and return the fee type deleted', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      const result: FeeTypeWithIncluded = FeeTypeOne;

      jest.spyOn(service, 'findById').mockResolvedValue(result);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.feeType, 'update').mockResolvedValue(result);

      const deleteFeeType = await service.remove(id, JWT_PAYLOAD);
      expect(deleteFeeType).toEqual(result);
      expect(historyService.create).toHaveBeenCalledTimes(1);
      expect(prisma.feeType.update).toHaveBeenCalledWith({
        data: { isDeleted: true },
        where: { id, isDeleted: false },
        include: { payments: true },
      });
    });

    it('should return error if no fee type is found ', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(
          new NotFoundException(`Fee type with id ${id} does not exist`),
        );

      await expect(service.remove(id, JWT_PAYLOAD)).rejects.toThrow(
        `Fee type with id ${id} does not exist`,
      );
      expect(prisma.feeType.delete).not.toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
