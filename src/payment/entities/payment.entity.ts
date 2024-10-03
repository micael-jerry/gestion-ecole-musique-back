import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaymentType } from '@prisma/client';
import { FeeType } from 'src/fee-type/entities/fee-type.entity';
import { User } from 'src/user/entities/user.entity';

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

  @Field(() => Date)
  createdAt: Date;

  @Field()
  userId: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => FeeType, { nullable: true })
  feeType?: FeeType;
}
