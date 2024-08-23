import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ActionType } from '../../action/entities/action.type';

@ObjectType('Role')
export class RoleType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [ActionType], { nullable: true })
  actions?: ActionType[];
}
