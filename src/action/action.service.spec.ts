import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Action } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { ActionService } from './action.service';

describe('ActionService', () => {
  let service: ActionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionService,
        {
          provide: PrismaService,
          useValue: {
            action: {
              findMany: jest.fn().mockResolvedValue([]),
              create: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'create action',
              }),
              findUnique: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'find Action',
                description: 'action description',
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ActionService>(ActionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllActions', () => {
    it('should return an array of Actions', async () => {
      const result: Action[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          tag: 'ALL',
          name: 'All',
          description: 'Has all privileges',
        },
      ];
      jest.spyOn(prisma.action, 'findMany').mockResolvedValue(result);

      const actions = await service.getAllActions();
      expect(actions).toEqual(result);
      expect(prisma.action.findMany).toHaveBeenCalled();
    });
  });

  describe('getActionById', () => {
    it('should return a single Action by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const result: Action = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        tag: 'ALL',
        name: 'All',
        description: 'Has All privileges',
      };
      jest.spyOn(prisma.action, 'findUnique').mockResolvedValue(result);

      const role = await service.getActionById(id);
      expect(role).toEqual(result);
      expect(prisma.action.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { roles: true },
      });
    });

    it('should return null if no action is found by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.action, 'findUnique')
        .mockRejectedValue(
          new NotFoundException(`action with ID "${id}" not found`),
        );

      await expect(service.getActionById(id)).rejects.toThrow(
        `action with ID "${id}" not found`,
      );
      expect(prisma.action.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { roles: true },
      });
    });
  });
});
