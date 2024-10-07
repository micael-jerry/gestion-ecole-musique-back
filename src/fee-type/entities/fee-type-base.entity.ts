import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FeeTypeBase {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  value: number;
}
