import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateFeeTypeInput } from './create-fee-type.input';

@InputType()
export class UpdateFeeTypeInput extends PartialType(CreateFeeTypeInput) {
  @Field()
  id: string;
}
