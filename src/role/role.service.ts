import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleInput } from './dto/createRole.input';
import { UpdateRoleInput } from './dto/updateRole.input';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getAllRoles(): Promise<Role[]> {
    return await this.prisma.role.findMany({ include: { actions: true } });
  }

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    return await this.prisma.role.create({
      data: createRoleInput,
      include: { actions: true },
    });
  }

  async getRoleById(id: string): Promise<Role> {
    const found = await this.prisma.role.findUnique({
      where: { id },
      include: { actions: true },
    });

    if (!found) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return found;
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
        include: { actions: true },
      });
    }
  }

  async deleteRole(id: string) {
    const found = await this.getRoleById(id);

    if (found) {
      return this.prisma.role.delete({ where: { id } });
    }
  }
}
