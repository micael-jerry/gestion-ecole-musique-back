import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ActionType } from '../../action/entities/action.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType('Role')
export class RoleType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [ActionType], { nullable: true })
  actions?: ActionType[];

  @Field(() => [User], { nullable: true })
  users?: User[];
}
