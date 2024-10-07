import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ActionBase')
export class ActionTypeBase {
  @Field(() => ID)
  id: string;

  @Field()
  tag: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
