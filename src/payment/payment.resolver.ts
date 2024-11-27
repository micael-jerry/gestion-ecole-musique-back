import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { ActionGuard } from '../auth/guard/action.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PaymentInput } from './dto/payment.input';
import { Payment } from './entities/payment.entity';
import { PaymentMapper } from './payment.mapper';
import { PaymentService } from './payment.service';

import { PaymentMonth } from './entities/payment.month';
import { PaymentListResponse } from './entities/payment.search.entity';
@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentMapper: PaymentMapper,
  ) {}

  @Actions('CREATE_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Context('user') user: JwtPayloadType,
    @Args('paymentInput')
    paymentInput: PaymentInput,
  ): Promise<Payment> {
    return this.paymentMapper.toGraphql(
      await this.paymentService.create(paymentInput, user),
    );
  }

  @Actions('SEARCH_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => PaymentListResponse)
  async getPayments(
    @Args('keyword', { nullable: true }) keyword?: string,
    @Args('startDate', { nullable: true }) startDate?: Date,
    @Args('endDate', { nullable: true }) endDate?: Date,
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<{ payments: Payment[]; total_count: number }> {
    const payments = await this.paymentService.getPayments(
      keyword,
      startDate,
      endDate,
      page,
      limit,
    );
    return {
      payments: payments.payments.map((p) => this.paymentMapper.toGraphql(p)),
      total_count: payments.total_count,
    };
  }

  @Actions('SEARCH_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => PaymentMonth)
  async getPaymentMonthsForCurrentYearByStudentId(
    @Args('id') id: string,
  ): Promise<PaymentMonth> {
    return await this.paymentService.getPaymentMonthsForCurrentYearByStudentId(
      id,
    );
  }

  @Actions('UPDATE_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Payment)
  async updatePayment(
    @Context('user') user: JwtPayloadType,
    @Args('paymentInput') paymentInput: PaymentInput,
    @Args('paymentId') paymentId: string,
  ): Promise<Payment> {
    return this.paymentMapper.toGraphql(
      await this.paymentService.updatePayment(paymentId, paymentInput, user),
    );
  }

  @Actions('DELETE_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Boolean)
  async deletePayment(
    @Context('user') user: JwtPayloadType,
    @Args('paymentId') paymentId: string,
  ): Promise<boolean> {
    await this.paymentService.deletePayment(paymentId, user);
    return true;
  }

  @Actions('PAYMENT_COUNT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => Number)
  async countPayments(): Promise<number> {
    return await this.paymentService.countPayments();
  }

  @Actions('SEARCH_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => Payment)
  async getPaymentById(@Args('id') id: string): Promise<Payment> {
    return this.paymentMapper.toGraphql(
      await this.paymentService.getPaymentById(id),
    );
  }
}
