import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CourseBase {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
