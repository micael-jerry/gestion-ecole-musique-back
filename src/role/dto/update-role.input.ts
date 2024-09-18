import { Field, InputType } from '@nestjs/graphql';
import { UpdateRoleActionInput } from './role-action.input';

@InputType()
export class UpdateRoleInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => UpdateRoleActionInput, { nullable: true })
  actions?: UpdateRoleActionInput;
}
