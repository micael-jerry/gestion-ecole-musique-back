import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoleType } from '../../role/entities/role.type';

@ObjectType('Action')
export class ActionType {
  @Field(() => ID)
  id: string;

  @Field()
  tag: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [RoleType], { nullable: true })
  roles?: RoleType[];
}
