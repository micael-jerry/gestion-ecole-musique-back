import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Payment } from './payment.entity';

@ObjectType()
export class PaymentListResponse {
  @Field(() => [Payment])
  payments: Payment[];

  @Field(() => Int)
  total_count: number;
}
