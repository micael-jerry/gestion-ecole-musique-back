import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { ReservationValidator } from './validator/reservation.validator';
import { ReservationTask } from './tasks/reservation.task';

@Module({
  providers: [
    ReservationResolver,
    ReservationService,
    ReservationValidator,
    ReservationTask,
    PrismaService,
  ],
})
export class ReservationModule {}
