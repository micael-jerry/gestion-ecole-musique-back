import { Field, InputType } from '@nestjs/graphql';
import { ActionTypeInput } from 'src/action/dto/actionType.input';

@InputType()
export class UpdateRoleInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [ActionTypeInput], { nullable: true })
  actions?: ActionTypeInput[];
}
