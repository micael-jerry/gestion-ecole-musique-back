import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleWithIncluded } from './types/role-with-included.type';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { EntityType, OperationType } from '@prisma/client';

@Injectable()
export class RoleService {
  private static readonly roleInclude = { actions: true, users: true };

  constructor(
    private readonly prisma: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async getAllRoles(): Promise<RoleWithIncluded[]> {
    return await this.prisma.role.findMany({
      include: RoleService.roleInclude,
    });
  }

  async createRole(
    createRoleInput: CreateRoleInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<RoleWithIncluded> {
    return await this.prisma.$transaction(async (tx) => {
      const roleCreated = await tx.role.create({
        data: createRoleInput,
        include: RoleService.roleInclude,
      });
      await this.historyService.create(
        {
          entityId: roleCreated.id,
          entityType: EntityType.ROLE,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return roleCreated;
    });
  }

  async getRoleById(id: string): Promise<RoleWithIncluded> {
    const found = await this.prisma.role.findUnique({
      where: { id },
      include: RoleService.roleInclude,
    });

    if (!found) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return found;
  }

  async getRoleByIdOrName({
    id = undefined,
    name = undefined,
  }: {
    id?: string;
    name?: string;
  }): Promise<RoleWithIncluded> {
    const role = await this.prisma.role.findUnique({
      where: { id, name },
      include: RoleService.roleInclude,
    });
    if (!role) throw new NotFoundException(`Role not found`);
    return role;
  }

  async updateRole(
    { id, name, actions }: UpdateRoleInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<RoleWithIncluded> {
    const found = await this.getRoleById(id);

    if (found) {
      return await this.prisma.$transaction(async (tx) => {
        const roleUpdated = await tx.role.update({
          where: { id },
          data: {
            name,
            actions: {
              connect: actions?.connect || [],
              disconnect: actions?.disconnect || [],
            },
          },
          include: RoleService.roleInclude,
        });
        await this.historyService.create(
          {
            entityId: roleUpdated.id,
            entityType: EntityType.ROLE,
            operationType: OperationType.UPDATE,
            userId: authenticatedUser.userId,
          },
          tx,
        );
        return roleUpdated;
      });
    }
  }

  async deleteRole(
    id: string,
    authenticatedUser: JwtPayloadType,
  ): Promise<RoleWithIncluded> {
    const found = await this.getRoleById(id);

    if (found) {
      return await this.prisma.$transaction(async (tx) => {
        const roleDeleted = await tx.role.delete({
          where: { id },
          include: RoleService.roleInclude,
        });
        await this.historyService.create(
          {
            entityId: roleDeleted.id,
            entityType: EntityType.ROLE,
            operationType: OperationType.DELETE,
            userId: authenticatedUser.userId,
          },
          tx,
        );
        return roleDeleted;
      });
    }
  }
}
