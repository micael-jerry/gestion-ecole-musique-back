import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TimeSlotWithIncluded } from './types/time-slot-with-included.type';
import { CreateTimeSlotInput } from './dto/create-time-slot.input';
import { TimeSlotValidator } from './validator/time-slot.validator';
import {
  EntityType,
  OperationType,
  Prisma,
  TimeSlotStatus,
} from '@prisma/client';
import { getTimeSlotCreateInputList } from './utils/time-slot.util';
import { UpdateTimeSlotInput } from './dto/update-time-slot.input';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TimeSlotService {
  private static readonly timeSlodeInclude = {
    teacher: {
      include: { role: true, courses: true, payments: true, timeSlots: true },
    },
  };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly timeSlotValidator: TimeSlotValidator,
    private readonly historyService: HistoryService,
  ) {}

  async findAll(
    teacherId?: string,
    status?: TimeSlotStatus,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimeSlotWithIncluded[]> {
    return await this.prismaService.timeSlot.findMany({
      where: {
        teacherId: teacherId ?? undefined,
        status: status ?? undefined,
        start: startDate ? { gte: startDate } : undefined,
        end: endDate ? { lte: endDate } : undefined,
      },
      orderBy: { start: 'asc' },
      include: TimeSlotService.timeSlodeInclude,
    });
  }

  async findById(id: string): Promise<TimeSlotWithIncluded> {
    const res = await this.prismaService.timeSlot.findUnique({
      where: { id },
      include: TimeSlotService.timeSlodeInclude,
    });
    if (!res) {
      throw new NotFoundException(`Time slot with id ${id} does not exist`);
    }
    return res;
  }

  async create(
    createTimeSlotInput: CreateTimeSlotInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<TimeSlotWithIncluded[]> {
    await this.timeSlotValidator.createTimeSloteValidate(createTimeSlotInput);

    const timeSlotCreateInputList: Prisma.TimeSlotUncheckedCreateInput[] =
      getTimeSlotCreateInputList(createTimeSlotInput);
    await this.timeSlotValidator.validateTimeSlotCreateInputList(
      timeSlotCreateInputList,
    );

    return await this.prismaService.$transaction(async (tx) => {
      const createdList = await tx.timeSlot.createManyAndReturn({
        data: timeSlotCreateInputList,
        include: TimeSlotService.timeSlodeInclude,
      });
      await this.historyService.createMany(
        createdList.map(({ id }) => ({
          entityId: id,
          entityType: EntityType.TIME_SLOT,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        })),
        tx,
      );
      return createdList;
    });
  }

  async update(
    updateTimeSlotListInput: UpdateTimeSlotInput[],
    authenticatedUser: JwtPayloadType,
  ): Promise<TimeSlotWithIncluded[]> {
    await this.timeSlotValidator.updateTimeSlotValidate(
      updateTimeSlotListInput,
    );

    await this.prismaService
      .$transaction([
        ...updateTimeSlotListInput.map((updateTimeSlot) =>
          this.prismaService.timeSlot.update({
            where: { id: updateTimeSlot.id },
            data: updateTimeSlot,
          }),
        ),
      ])
      .then(async (res) => {
        await this.historyService.createMany(
          res.map(({ id }) => ({
            entityId: id,
            entityType: EntityType.TIME_SLOT,
            operationType: OperationType.UPDATE,
            userId: authenticatedUser.userId,
          })),
        );
      });
    return await this.prismaService.timeSlot.findMany({
      where: { id: { in: updateTimeSlotListInput.map((t) => t.id) } },
      include: TimeSlotService.timeSlodeInclude,
      orderBy: { start: 'asc' },
    });
  }
}
