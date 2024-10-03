import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeeTypeInput } from './dto/create-fee-type.input';
import { EntityType, FeeType, OperationType } from '@prisma/client';
import { UpdateFeeTypeInput } from './dto/update-fee-type.input';
import { HistoryService } from '../history/history.service';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';

@Injectable()
export class FeeTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async create(
    createFeeTypeInput: CreateFeeTypeInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<FeeType> {
    return await this.prismaService.$transaction(async (tx) => {
      const feeTypeCreated = await tx.feeType.create({
        data: createFeeTypeInput,
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

  async findAll(): Promise<FeeType[]> {
    return await this.prismaService.feeType.findMany();
  }

  async findById(id: string): Promise<FeeType> {
    const feeType = await this.prismaService.feeType.findUnique({
      where: { id: id },
    });
    if (!feeType) {
      throw new NotFoundException(`Fee type with id ${id} does not exist`);
    }
    return feeType;
  }

  async update(
    updateFeeTypeInput: UpdateFeeTypeInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<FeeType> {
    return await this.prismaService.$transaction(async (tx) => {
      const feeTypeUpdated = await tx.feeType.update({
        where: { id: updateFeeTypeInput.id },
        data: updateFeeTypeInput,
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
  ): Promise<FeeType> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const feeTypeRemoved = await tx.feeType.delete({
          where: { id: id },
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
