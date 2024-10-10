import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TimeSlotService } from './time.slot.service';
import { TimeSlotResolver } from './time-slot.resolver';
import { TimeSlotValidator } from './validator/time-slot.validator';

@Module({
  providers: [
    TimeSlotResolver,
    TimeSlotService,
    PrismaService,
    TimeSlotValidator,
  ],
})
export class TimeSlotModule {}
