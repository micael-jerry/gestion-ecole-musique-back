import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActionWithIncluded } from './types/action-with-included.type';

@Injectable()
export class ActionService {
  private static actionInclude = { roles: true };
  constructor(private prisma: PrismaService) {}

  async getAllActions(): Promise<ActionWithIncluded[]> {
    return this.prisma.action.findMany({
      include: ActionService.actionInclude,
    });
  }

  async getActionById(id: string): Promise<ActionWithIncluded> {
    const found = await this.prisma.action.findUnique({
      where: { id },
      include: ActionService.actionInclude,
    });

    if (!found) {
      throw new NotFoundException(`Action with ID ${id} not found`);
    }
    return found;
  }

  async getActionByTag(tag: string): Promise<ActionWithIncluded> {
    const found = await this.prisma.action.findUnique({
      where: { tag },
      include: ActionService.actionInclude,
    });

    if (!found) {
      throw new NotFoundException(`Action with tag ${tag} not found`);
    }
    return found;
  }
}
