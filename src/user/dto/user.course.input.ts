import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCourseInput {
  @Field()
  id: string;
}

@InputType()
export class UpdateUserCoursesInput {
  @Field(() => [UserCourseInput], {
    nullable: true,
    description: 'if you wish to ASSOCIATE a user with one or more courses',
  })
  connect?: UserCourseInput[];
  @Field(() => [UserCourseInput], {
    nullable: true,
    description: 'if you wish to DISASSOCIATE a user from one or more courses',
  })
  disconnect?: UserCourseInput[];
}
