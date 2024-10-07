import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaymentType } from '@prisma/client';

@ObjectType()
export class PaymentBase {
  @Field(() => ID)
  id: string;

  @Field()
  amount: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Date])
  date: Date[];

  @Field()
  paymentType: PaymentType;

  @Field(() => Date)
  createdAt: Date;
}
