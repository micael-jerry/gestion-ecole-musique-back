import { Injectable } from '@nestjs/common';
import { EntityType, OperationType, Prisma } from '@prisma/client';

import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  private static readonly paymentsInclude = {
    user: { include: { role: true, courses: true, payments: true } },
    feeType: true,
  };
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
  ) {}

  async create(
    paymentInput: PaymentInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<Payment> {
    return await this.prismaService.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: paymentInput,
        include: PaymentService.paymentsInclude,
      });
      await this.historyService.create(
        {
          entityId: payment.id,
          entityType: EntityType.PAYMENT,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return payment;
    });
  }

  /**
   * Retrieves a list of payments based on the provided keyword, date range, page, and limit.
   *
   * @param {string} [keyword] - Optional keyword to filter payments by user firstname, lastname, or fee type name.
   * @param {Date} [startDate] - Optional start date to filter payments.
   * @param {Date} [endDate] - Optional end date to filter payments.
   * @param {number} [page=1] - The page number for pagination. Defaults to 1.
   * @param {number} [limit=25] - The number of payments to retrieve per page. Defaults to 25.
   * @returns {Promise<Payment[]>} - A promise that resolves to an array of payments.
   */
  async getPayments(
    keyword?: string,
    startDate?: Date,
    endDate?: Date,
    page: number = 1,
    limit: number = 25,
  ): Promise<Payment[]> {
    const take = limit;
    const skip = (page - 1) * take;

    const paymentWhereInput: Prisma.PaymentWhereInput = {};

    if (keyword) {
      const keywords = keyword.split(' ');

      paymentWhereInput.OR = keywords.map((kw) => ({
        OR: [
          { user: { firstname: { contains: kw, mode: 'insensitive' } } },
          { user: { lastname: { contains: kw, mode: 'insensitive' } } },
          { feeType: { name: { contains: kw, mode: 'insensitive' } } },
        ],
      }));
    }

    if (startDate || endDate) {
      paymentWhereInput.AND = [
        ...(Array.isArray(paymentWhereInput.AND) ? paymentWhereInput.AND : []),
        {
          createdAt: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
        },
      ];
    }

    return await this.prismaService.payment.findMany({
      where: paymentWhereInput,
      include: PaymentService.paymentsInclude,
      take,
      skip,
    });
  }
}
