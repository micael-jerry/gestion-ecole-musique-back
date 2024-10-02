import { Injectable } from '@nestjs/common';
import { EntityType, OperationType } from '@prisma/client';

import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    private historyService: HistoryService,
  ) {}

  async create(
    paymentInput: PaymentInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<Payment> {
    const payment = await this.prismaService.payment.create({
      data: paymentInput,
    });
    await this.historyService.create({
      entityId: payment.id,
      entityType: EntityType.PAYMENT,
      operationType: OperationType.CREATE,
      userId: authenticatedUser.userId,
    });

    return payment;
  }

  async getPayments(): Promise<Payment[]> {
    return await this.prismaService.payment.findMany();
  }
}
