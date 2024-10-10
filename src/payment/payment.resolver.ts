import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { ActionGuard } from '../auth/guard/action.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PaymentInput } from './dto/payment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentMapper } from './payment.mapper';

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
  @Query(() => [Payment])
  async getPayments(
    @Args('keyword', { nullable: true }) keyword?: string,
    @Args('startDate', { nullable: true }) startDate?: Date,
    @Args('endDate', { nullable: true }) endDate?: Date,
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<Payment[]> {
    return (
      await this.paymentService.getPayments(
        keyword,
        startDate,
        endDate,
        page,
        limit,
      )
    ).map((p) => this.paymentMapper.toGraphql(p));
  }
}
