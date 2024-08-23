import { Injectable, NotFoundException } from '@nestjs/common';
import { Action } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActionService {
  constructor(private prisma: PrismaService) {}

  async getAllActions(): Promise<Action[]> {
    return this.prisma.action.findMany({ include: { roles: true } });
  }

  async getActionById(id: string): Promise<Action> {
    const found = await this.prisma.action.findUnique({
      where: { id },
      include: { roles: true },
    });

    if (!found) {
      throw new NotFoundException(`Action with ID ${id} not found`);
    }
    return found;
  }
}
