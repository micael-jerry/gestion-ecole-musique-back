import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../src/prisma/prisma.service';
import { RoleService } from './role.service';

describe('RolesService', () => {
  let service: RoleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: PrismaService,
          useValue: {
            role: {
              findMany: jest.fn().mockResolvedValue([]),
              create: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'create role',
              }),
              findUnique: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'find Role',
              }),
              update: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'Updated Role',
                actions: [{ id: uuid(), name: 'test', description: 'testing' }],
              }),
              delete: jest.fn().mockResolvedValue({
                id: uuid(),
                name: 'delete Role',
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllRoles', () => {
    it('should return an array of Roles', async () => {
      const result: Role[] = [
        {
          id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
          name: 'ADMIN',
        },
      ];
      jest.spyOn(prisma.role, 'findMany').mockResolvedValue(result);

      const Roles = await service.getAllRoles();
      expect(Roles).toEqual(result);
      expect(prisma.role.findMany).toHaveBeenCalledWith({
        include: { actions: true, users: true },
      });
    });
  });

  describe('createRole', () => {
    it('should create a new role and return it', async () => {
      const createRoleInput = { name: 'Test Role' };
      const result: Role = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        ...createRoleInput,
      };
      jest.spyOn(prisma.role, 'create').mockResolvedValue(result);

      const role = await service.createRole(createRoleInput);

      expect(role).toEqual(result);
      expect(prisma.role.create).toHaveBeenCalledWith({
        data: createRoleInput,
        include: { actions: true, users: true },
      });
    });
  });

  describe('getRoleById', () => {
    it('should return a single role by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const result: Role = {
        id: '0cdd1713-d391-451c-b60b-0ecefb22c049',
        name: 'ADMIN',
      };
      jest.spyOn(prisma.role, 'findUnique').mockResolvedValue(result);

      const role = await service.getRoleById(id);
      expect(role).toEqual(result);
      expect(prisma.role.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { actions: true, users: true },
      });
    });

    it('should return null if no role is found by ID', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.role, 'findUnique')
        .mockRejectedValue(
          new NotFoundException(`role with ID "${id}" not found`),
        );

      await expect(service.getRoleById(id)).rejects.toThrow(
        `role with ID "${id}" not found`,
      );
      expect(prisma.role.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { actions: true, users: true },
      });
    });
  });

  describe('updateRole', () => {
    it('should update and return the role', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const updateRoleInput = {
        id,
        name: 'Updated Role',
        actions: {
          connect: [{ id }],
        },
      };
      const result: Role = { ...updateRoleInput };

      jest.spyOn(prisma.role, 'update').mockResolvedValue(result);

      const updatedRole = await service.updateRole(updateRoleInput);
      expect(updatedRole).toEqual(result);
      expect(prisma.role.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          name: updateRoleInput.name,
          actions: {
            connect: updateRoleInput.actions.connect.map((actionId) => ({
              id: actionId.id,
            })),
            disconnect: [],
          },
        },
        include: { actions: true, users: true },
      });
    });

    it('should throw an error if the role does not exist', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const updateRoleInput = {
        id,
        name: 'Updated Role',
        actions: {
          connect: [{ id }],
        },
      };

      jest
        .spyOn(prisma.role, 'update')
        .mockRejectedValue(new Error('role not found'));

      await expect(service.updateRole(updateRoleInput)).rejects.toThrow(
        'role not found',
      );
      expect(prisma.role.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          name: updateRoleInput.name,
          actions: {
            connect: updateRoleInput.actions.connect.map((actionId) => ({
              id: actionId.id,
            })),
            disconnect: [],
          },
        },
        include: { actions: true, users: true },
      });
    });
  });

  describe('deleteRole', () => {
    it('should delete and return the role deleted', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';
      const deleteRoleInput = {
        id,
        name: 'delete Setting',
      };
      const result: Role = { ...deleteRoleInput };

      jest.spyOn(prisma.role, 'delete').mockResolvedValue(result);

      const deleteRole = await service.deleteRole(id);
      expect(deleteRole).toEqual(result);
      expect(prisma.role.delete).toHaveBeenCalledWith({
        where: { id },
        include: { actions: true, users: true },
      });
    });

    it('should return error if no role is found ', async () => {
      const id = '0cdd1713-d391-451c-b60b-0ecefb22c049';

      jest
        .spyOn(prisma.role, 'delete')
        .mockRejectedValue(
          new NotFoundException(`role with ID "${id}" not found`),
        );

      await expect(service.deleteRole(id)).rejects.toThrow(
        `role with ID "${id}" not found`,
      );
      expect(prisma.role.delete).toHaveBeenCalledWith({
        where: { id },
        include: { actions: true, users: true },
      });
    });
  });
});
