import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleWithIncluded } from './types/role-with-included.type';

@Injectable()
export class RoleService {
  private static roleInclude = { actions: true, users: true };

  constructor(private prisma: PrismaService) {}

  async getAllRoles(): Promise<RoleWithIncluded[]> {
    return await this.prisma.role.findMany({
      include: RoleService.roleInclude,
    });
  }

  async createRole(
    createRoleInput: CreateRoleInput,
  ): Promise<RoleWithIncluded> {
    return await this.prisma.role.create({
      data: createRoleInput,
      include: RoleService.roleInclude,
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

  async updateRole({
    id,
    name,
    actions,
  }: UpdateRoleInput): Promise<RoleWithIncluded> {
    const found = await this.getRoleById(id);

    if (found) {
      return await this.prisma.role.update({
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
    }
  }

  async deleteRole(id: string): Promise<RoleWithIncluded> {
    const found = await this.getRoleById(id);

    if (found) {
      return this.prisma.role.delete({
        where: { id },
        include: RoleService.roleInclude,
      });
    }
  }
}
