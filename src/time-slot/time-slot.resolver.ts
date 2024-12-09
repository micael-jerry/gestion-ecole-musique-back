import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimeSlot } from './entities/time-slot.entity';
import { TimeSlotService } from './time.slot.service';
import { CreateTimeSlotInput } from './dto/create-time-slot.input';
import { TimeSlotStatus } from '@prisma/client';
import { UpdateTimeSlotInput } from './dto/update-time-slot.input';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { TimeSlotMapper } from './time-slot.mapper';

@Resolver(() => TimeSlot)
export class TimeSlotResolver {
  constructor(
    private readonly timeSlotService: TimeSlotService,
    private readonly timeSlotMapper: TimeSlotMapper,
  ) {}

  @Actions('GET_TIME_SLOT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [TimeSlot])
  async findAllTimeSlot(
    @Args('teacherId', { nullable: true }) teacherId: string,
    @Args('status', { nullable: true, type: () => TimeSlotStatus })
    status: TimeSlotStatus,
    @Args('startDate', {
      nullable: true,
      type: () => Date,
      description: 'filter time slot starting after the given date',
    })
    startDate: Date,
    @Args('endDate', {
      nullable: true,
      type: () => Date,
      description: 'filter time slot ending on the given date',
    })
    endDate: Date,
  ): Promise<TimeSlot[]> {
    return (
      await this.timeSlotService.findAll(teacherId, status, startDate, endDate)
    ).map((timeSlot) => this.timeSlotMapper.toGraphql(timeSlot));
  }

  @Actions('GET_TIME_SLOT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => TimeSlot)
  async findByIdTimeSlot(@Args('id') id: string): Promise<TimeSlot> {
    return this.timeSlotMapper.toGraphql(
      await this.timeSlotService.findById(id),
    );
  }

  @Actions('CREATE_TIME_SLOT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => [TimeSlot])
  async createTimeSlot(
    @Context('user') user: JwtPayloadType,
    @Args('createTimeSlotInput') createTimeSlotInput: CreateTimeSlotInput,
  ): Promise<TimeSlot[]> {
    return (await this.timeSlotService.create(createTimeSlotInput, user)).map(
      (timeSlot) => this.timeSlotMapper.toGraphql(timeSlot),
    );
  }

  @Actions('UPDATE_TIME_SLOT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => [TimeSlot])
  async updateTimeSlot(
    @Context('user') user: JwtPayloadType,
    @Args('updateTimeSlotListInput', { type: () => [UpdateTimeSlotInput] })
    updateTimeSlotListInput: UpdateTimeSlotInput[],
  ): Promise<TimeSlot[]> {
    return (
      await this.timeSlotService.update(updateTimeSlotListInput, user)
    ).map((timeSlot) => this.timeSlotMapper.toGraphql(timeSlot));
  }
}
