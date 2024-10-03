import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityType, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryInput } from './dto/create-history.input';
import { HistoryWithIncluded } from './types/history-with-included.type';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class HistoryService {
  private static readonly historyInclude = {
    user: { include: { role: true, courses: true, payments: true } },
  };

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    history: CreateHistoryInput,
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ): Promise<HistoryWithIncluded> {
    const entity = await this.findEntityById(
      history.entityId,
      history.entityType,
    );
    const createdHistory = await tx.history.create({
      data: history,
      include: HistoryService.historyInclude,
    });
    return { ...createdHistory, entity };
  }

  async findById(id: string): Promise<HistoryWithIncluded> {
    const history = await this.prismaService.history.findUnique({
      where: { id },
      include: HistoryService.historyInclude,
    });
    if (!history) {
      throw new NotFoundException(`History ${id} not found`);
    }
    const entity: object = await this.findEntityById(
      history.entityId,
      history.entityType,
    );
    return { ...history, entity };
  }

  async findAll(
    entityType?: EntityType,
    entityId?: string,
  ): Promise<HistoryWithIncluded[]> {
    if (entityId) return await this.findAllByEntityId(entityId, entityType);
    const historyList = await this.findAllByEntityType(entityType ?? undefined);
    const entityList = await this.findAllEntityByEntityType(
      entityType ?? 'ALL',
    );
    return historyList.map((h) => {
      let entity = null;
      for (const e of entityList) {
        if (h.entityId === e.id) {
          entity = e;
          break;
        }
      }
      return { ...h, entity };
    });
  }

  async findAllByEntityType(entityType?: EntityType) {
    return await this.prismaService.history.findMany({
      where: { entityType: entityType },
      include: HistoryService.historyInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllByEntityId(
    entityId: string,
    entityType: EntityType,
  ): Promise<HistoryWithIncluded[]> {
    const entity: object = await this.findEntityById(entityId, entityType);
    if (!entity) {
      throw new NotFoundException(
        `Entity ${entityId} of type ${entityType} not found`,
      );
    }
    const historyList = await this.prismaService.history.findMany({
      where: { entityId, entityType },
      include: HistoryService.historyInclude,
    });
    return historyList.map((history) => ({ ...history, entity }));
  }

  async findAllEntityByEntityType(entityType: EntityType | 'ALL') {
    switch (entityType) {
      case EntityType.COURSE:
        return await this.prismaService.course.findMany();
      case EntityType.SETTING:
        return await this.prismaService.setting.findMany();
      case EntityType.FEE_TYPE:
        return await this.prismaService.feeType.findMany();
      case EntityType.ROLE:
        return await this.prismaService.role.findMany({
          include: { actions: true, users: true },
        });
      case EntityType.USER:
        return await this.prismaService.user.findMany({
          include: { role: true, courses: true },
        });
      case EntityType.PAYMENT:
        return await this.prismaService.payment.findMany({
          include: { user: true, feeType: true },
        });
      case 'ALL': {
        const [courses, settings, feeTypes, roles, users, payments] =
          await Promise.all([
            this.prismaService.course.findMany(),
            this.prismaService.setting.findMany(),
            this.prismaService.feeType.findMany(),
            this.prismaService.role.findMany({
              include: { actions: true, users: true },
            }),
            this.prismaService.user.findMany({
              include: { role: true, courses: true },
            }),
            this.prismaService.payment.findMany({
              include: { user: true, feeType: true },
            }),
          ]);
        return [
          ...courses,
          ...settings,
          ...feeTypes,
          ...roles,
          ...users,
          ...payments,
        ];
      }
      default:
        throw new BadRequestException(`Unknown entity type`);
    }
  }

  async findEntityById(entityId: string, entityType: EntityType) {
    try {
      switch (entityType) {
        case EntityType.COURSE:
          return await this.prismaService.course.findUnique({
            where: { id: entityId },
          });
        case EntityType.SETTING:
          return await this.prismaService.setting.findUnique({
            where: { id: entityId },
          });
        case EntityType.FEE_TYPE:
          return await this.prismaService.feeType.findUnique({
            where: { id: entityId },
          });
        case EntityType.ROLE:
          return await this.prismaService.role.findUnique({
            where: { id: entityId },
            include: { actions: true, users: true },
          });
        case EntityType.USER:
          return await this.prismaService.user.findUnique({
            where: { id: entityId },
            include: { role: true, courses: true },
          });
        case EntityType.PAYMENT:
          return await this.prismaService.payment.findUnique({
            where: { id: entityId },
            include: {
              feeType: true,
              user: { include: { role: true, courses: true } },
            },
          });
        default:
          throw new BadRequestException(`Unknown entity type`);
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException(
        `Entity ${entityId} of type ${entityType} not found`,
      );
    }
  }
}
