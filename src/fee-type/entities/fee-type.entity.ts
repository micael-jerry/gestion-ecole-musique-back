import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { FeeTypeBase } from './fee-type-base.entity';
import { PaymentBase } from '../../payment/entities/payment-base.entity';

@ObjectType()
export class FeeType extends PickType(FeeTypeBase, [
  'id',
  'name',
  'description',
  'value',
]) {
  @Field(() => [PaymentBase], { nullable: true })
  payments?: PaymentBase[];
}
