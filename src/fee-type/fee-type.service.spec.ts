import { FeeType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FeeTypeService } from './fee-type.service';

describe('FeeTypeService', () => {
  let service: FeeTypeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeeTypeService,
        {
          provide: PrismaService,
          useValue: {
            feeType: {
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

    service = module.get<FeeTypeService>(FeeTypeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFeeType', () => {
    it('should create a new fee type and return it', async () => {
      const createFeeTypeInput = {
        name: 'fee type',
        description: 'create fee type',
      } satisfies Prisma.FeeTypeCreateInput;

      const result: FeeType = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        ...createFeeTypeInput,
      };
      jest.spyOn(prisma.feeType, 'create').mockResolvedValue(result);

      const feeType = await service.create(createFeeTypeInput);

      expect(feeType).toEqual(result);
      expect(prisma.feeType.create).toHaveBeenCalledWith({
        data: createFeeTypeInput,
      });
    });
  });

  describe('findAllFeeType', () => {
    it('should return an array of fee type', async () => {
      const result: FeeType[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          name: 'fee type',
          description: 'fee type description',
        },
      ];
      jest.spyOn(prisma.feeType, 'findMany').mockResolvedValue(result);

      const feeType = await service.findAll();
      expect(feeType).toEqual(result);
      expect(prisma.feeType.findMany).toHaveBeenCalled();
    });
  });

  describe('findByIdFeeType', () => {
    it('should return a single fee type by ID', async () => {
      const result: FeeType = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'fee type',
        description: 'fee type description',
      };
      jest.spyOn(prisma.feeType, 'findUnique').mockResolvedValue(result);

      const feeType = await service.findById(
        '0cdd1713-d391-451c-b60b-0ecefb22c049',
      );
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
        where: { id },
      });
    });
  });

  describe('updateFeeType', () => {
    it('should update and return the fee type', async () => {
      const updateFeeTypeInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Updated fee type',
        description: 'Updated fee type description',
      };

      const result: FeeType = { ...updateFeeTypeInput };

      jest.spyOn(prisma.feeType, 'update').mockResolvedValue(result);

      const updatedFeeType = await service.update(updateFeeTypeInput);
      expect(updatedFeeType).toEqual(result);
      expect(prisma.feeType.update).toHaveBeenCalledWith({
        where: { id: updateFeeTypeInput.id },
        data: updateFeeTypeInput,
      });
    });

    it('should throw an error if the fee type does not exist', async () => {
      const updateFeeTypeInput = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'Fee Type',
        description: 'Fee Type description',
      };

      jest
        .spyOn(prisma.feeType, 'update')
        .mockRejectedValue(new Error('Fee type not found'));

      await expect(service.update(updateFeeTypeInput)).rejects.toThrow(
        'Fee type not found',
      );
      expect(prisma.feeType.update).toHaveBeenCalledWith({
        where: { id: updateFeeTypeInput.id },
        data: updateFeeTypeInput,
      });
    });
  });

  describe('deleteFeeType', () => {
    it('should delete and return the fee type deleted', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      const result: FeeType = {
        id,
        name: 'delete fee type',
        description: 'delete fee type description',
      };

      jest.spyOn(prisma.feeType, 'delete').mockResolvedValue(result);

      const deleteFeeType = await service.remove(id);
      expect(deleteFeeType).toEqual(result);
      expect(prisma.feeType.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return error if no fee type is found ', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.feeType, 'delete')
        .mockRejectedValue(
          new NotFoundException(`Fee type with id ${id} does not exist`),
        );

      await expect(service.remove(id)).rejects.toThrow(
        `Fee type with id ${id} does not exist`,
      );
      expect(prisma.feeType.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
