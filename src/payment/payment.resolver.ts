import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Actions } from 'src/auth/decorator/set-metadata-action.decorator';
import { JwtPayloadType } from 'src/auth/entities/jwt-payload.entity';
import { ActionGuard } from 'src/auth/guard/action.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PaymentInput } from './dto/payment.input';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Actions('CREATE_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Payment)
  createPayment(
    @Context('user') user: JwtPayloadType,
    @Args('paymentInput')
    paymentInput: PaymentInput,
  ) {
    return this.paymentService.create(paymentInput, user);
  }

  @Actions('SEARCH_PAYMENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [Payment])
  getPayments(
    @Args('keyword', { nullable: true }) keyword?: string,
    @Args('startDate', { nullable: true }) startDate?: Date,
    @Args('endDate', { nullable: true }) endDate?: Date,
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ) {
    return this.paymentService.getPayments(
      keyword,
      startDate,
      endDate,
      page,
      limit,
    );
  }
}
