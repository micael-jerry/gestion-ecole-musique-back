import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TimeSlotService } from './time.slot.service';
import { TimeSlotResolver } from './time-slot.resolver';
import { TimeSlotValidator } from './validator/time-slot.validator';
import { TimeSlotTask } from './tasks/time-slot.task';

@Module({
  providers: [
    TimeSlotResolver,
    TimeSlotService,
    PrismaService,
    TimeSlotValidator,
    TimeSlotTask,
  ],
})
export class TimeSlotModule {}
