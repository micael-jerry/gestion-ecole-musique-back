import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { ReservationValidator } from './validator/reservation.validator';

@Module({
  providers: [
    ReservationResolver,
    ReservationService,
    ReservationValidator,
    PrismaService,
  ],
})
export class ReservationModule {}
