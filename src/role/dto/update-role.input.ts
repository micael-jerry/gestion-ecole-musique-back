import { Field, InputType } from '@nestjs/graphql';
import { ActionTypeInput } from '../../action/dto/action-type.input';

@InputType()
export class UpdateRoleInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [ActionTypeInput], { nullable: true })
  actions?: ActionTypeInput[];
}
