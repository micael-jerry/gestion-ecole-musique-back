import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TimeSlotStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimeSlotTask {
  private readonly logger = new Logger(TimeSlotTask.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * This task is responsible for checking and updating the status of time slots.
   * It runs every day at 1 AM.
   *
   * @cron CronExpression.EVERY_DAY_AT_1AM - Specifies the cron expression for scheduling the task.
   * @returns {Promise<void>} - Returns a promise that resolves when the task is completed.
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async checkTimeSlotStatus(): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      await tx.timeSlot
        .updateMany({
          where: {
            status: TimeSlotStatus.AVAILABLE,
            start: { lt: new Date() },
          },
          data: { status: TimeSlotStatus.EXPIRED },
        })
        .then((res) => {
          this.logger.log(`Updated ${res.count} time slots.`);
        })
        .catch((err) => {
          this.logger.error('Error updating time slots:', err);
        });
    });
  }
}
