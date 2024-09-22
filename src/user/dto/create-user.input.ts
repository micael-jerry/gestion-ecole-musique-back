import { Field, InputType, PickType } from '@nestjs/graphql';
import { UserCourseInput } from './user.course.input';
import { UserRoleInput } from './user.role.input';
import { BaseUserInput } from './base-user.input';

@InputType()
export class CreateUserInput extends PickType(BaseUserInput, [
  'firstname',
  'lastname',
  'email',
  'password',
  'address',
  'phone',
  'description',
]) {
  @Field(() => UserRoleInput)
  role: UserRoleInput;

  @Field(() => [UserCourseInput], { nullable: true })
  courses?: UserCourseInput[];
}
