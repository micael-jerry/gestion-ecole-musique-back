import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { PaymentBase } from './payment-base.entity';
import { FeeTypeBase } from '../../fee-type/entities/fee-type-base.entity';

@ObjectType()
export class Payment extends PickType(PaymentBase, [
  'id',
  'amount',
  'paymentType',
  'date',
  'description',
  'createdAt',
]) {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => FeeTypeBase, { nullable: true })
  feeType?: FeeTypeBase;
}
