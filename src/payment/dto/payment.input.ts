import { Field, InputType } from '@nestjs/graphql';
import { PaymentType } from '@prisma/client';

@InputType()
export class PaymentInput {
  @Field()
  feeTypeId: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Date])
  date: Date[];

  @Field()
  paymentType: PaymentType;

  @Field()
  userId: string;
}
