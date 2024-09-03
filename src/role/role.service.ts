import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getAllRoles(): Promise<Role[]> {
    return await this.prisma.role.findMany({
      include: { actions: true, users: true },
    });
  }

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    return await this.prisma.role.create({
      data: createRoleInput,
      include: { actions: true, users: true },
    });
  }

  async getRoleById(id: string): Promise<Role> {
    const found = await this.prisma.role.findUnique({
      where: { id },
      include: { actions: true, users: true },
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
  }): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { id, name },
      include: { actions: true, users: true },
    });
    if (!role) throw new NotFoundException(`Role not found`);
    return role;
  }

  async updateRole(updateRoleInput: UpdateRoleInput) {
    const { id, name, actions = [] } = updateRoleInput;
    const found = await this.getRoleById(id);

    if (found) {
      return await this.prisma.role.update({
        where: { id },
        data: {
          name,
          actions: {
            connect: actions.map((actionId) => ({ id: actionId.id })),
          },
        },
        include: { actions: true, users: true },
      });
    }
  }

  async deleteRole(id: string) {
    const found = await this.getRoleById(id);

    if (found) {
      return this.prisma.role.delete({
        where: { id },
        include: { actions: true, users: true },
      });
    }
  }
}
