import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaymentType } from '@prisma/client';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

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
