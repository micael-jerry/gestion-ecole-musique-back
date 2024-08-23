import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FeeType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
