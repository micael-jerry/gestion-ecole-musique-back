import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeeTypeInput } from './dto/create-fee-type.input';
import { EntityType, OperationType } from '@prisma/client';
import { UpdateFeeTypeInput } from './dto/update-fee-type.input';
import { HistoryService } from '../history/history.service';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { FeeTypeWithIncluded } from './types/fee-type-with-included.type';

@Injectable()
export class FeeTypeService {
  private static readonly feeTypeInclude = { payments: true };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async create(
    createFeeTypeInput: CreateFeeTypeInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<FeeTypeWithIncluded> {
    return await this.prismaService.$transaction(async (tx) => {
      const feeTypeCreated = await tx.feeType.create({
        data: createFeeTypeInput,
        include: FeeTypeService.feeTypeInclude,
      });
      await this.historyService.create(
        {
          entityId: feeTypeCreated.id,
          entityType: EntityType.FEE_TYPE,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return feeTypeCreated;
    });
  }

  async findAll(): Promise<FeeTypeWithIncluded[]> {
    return await this.prismaService.feeType.findMany({
      include: FeeTypeService.feeTypeInclude,
    });
  }

  async findById(id: string): Promise<FeeTypeWithIncluded> {
    const feeType = await this.prismaService.feeType.findUnique({
      where: { id: id },
      include: FeeTypeService.feeTypeInclude,
    });
    if (!feeType) {
      throw new NotFoundException(`Fee type with id ${id} does not exist`);
    }
    return feeType;
  }

  async update(
    updateFeeTypeInput: UpdateFeeTypeInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<FeeTypeWithIncluded> {
    return await this.prismaService.$transaction(async (tx) => {
      const feeTypeUpdated = await tx.feeType.update({
        where: { id: updateFeeTypeInput.id },
        data: updateFeeTypeInput,
        include: FeeTypeService.feeTypeInclude,
      });
      await this.historyService.create(
        {
          entityId: feeTypeUpdated.id,
          entityType: EntityType.FEE_TYPE,
          operationType: OperationType.UPDATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return feeTypeUpdated;
    });
  }

  async remove(
    id: string,
    authenticatedUser: JwtPayloadType,
  ): Promise<FeeTypeWithIncluded> {
    const feeType = await this.findById(id);
    if (feeType.payments.length > 0) {
      throw new BadRequestException(
        `This fee type with id ${id} is linked with several payments`,
      );
    }
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const feeTypeRemoved = await tx.feeType.delete({
          where: { id: id },
          include: FeeTypeService.feeTypeInclude,
        });
        await this.historyService.create(
          {
            entityId: feeTypeRemoved.id,
            entityType: EntityType.FEE_TYPE,
            operationType: OperationType.DELETE,
            userId: authenticatedUser.userId,
          },
          tx,
        );
        return feeTypeRemoved;
      });
    } catch (err) {
      throw new NotFoundException(`Fee type with id ${id} does not exist`);
    }
  }
}
