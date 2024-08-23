import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeeTypeInput } from './dto/create-fee-type.input';
import { FeeType } from '@prisma/client';
import { UpdateFeeTypeInput } from './dto/update-fee-type.input';

@Injectable()
export class FeeTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFeeTypeInput: CreateFeeTypeInput): Promise<FeeType> {
    return await this.prismaService.feeType.create({
      data: createFeeTypeInput,
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

  async update(updateFeeTypeInput: UpdateFeeTypeInput): Promise<FeeType> {
    return await this.prismaService.feeType.update({
      where: { id: updateFeeTypeInput.id },
      data: updateFeeTypeInput,
    });
  }

  async remove(id: string): Promise<FeeType> {
    try {
      return await this.prismaService.feeType.delete({
        where: { id: id },
      });
    } catch (err) {
      throw new NotFoundException(`Fee type with id ${id} does not exist`);
    }
  }
}
