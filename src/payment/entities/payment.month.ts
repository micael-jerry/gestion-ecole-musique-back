import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentMonth {
  @Field(() => [String])
  months: string[];
}
