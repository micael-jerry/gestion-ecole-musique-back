import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Reservation, ReservationStatus, Setting } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReservationTask {
  private readonly logger = new Logger(ReservationTask.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async checkTimeSlotStatus(): Promise<void> {
    try {
      const reservationValidityPeriod: Setting =
        await this.prismaService.setting.findUnique({
          where: { tag: 'RESERVATION_VALIDITY_PERIOD' },
        });
      const expiredReservationList: Reservation[] = (
        await this.prismaService.reservation.findMany({
          where: { status: ReservationStatus.PENDING },
        })
      ).filter((reservation) => {
        const lastValidDate: Date = new Date(reservation.createdAt);
        lastValidDate.setDate(
          reservation.createdAt.getDate() + reservationValidityPeriod.value,
        );
        if (new Date() >= lastValidDate)
          return { ...reservation, status: ReservationStatus.REJECTED };
      });
      await this.prismaService.$transaction(
        expiredReservationList.map((expiredReservation) =>
          this.prismaService.reservation.update({
            where: { id: expiredReservation.id },
            data: expiredReservation,
          }),
        ),
      );
      this.logger.log(
        `Checked and updated ${expiredReservationList.length} reservations`,
      );
    } catch (err) {
      this.logger.error(`Error checking reservation status: ${err.message}`);
    }
  }
}
