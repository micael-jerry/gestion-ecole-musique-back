import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('RoleBase')
export class RoleTypeBase {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
