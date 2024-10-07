import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { CourseBase } from './course-base.entity';
import { UserBase } from '../../user/entities/user-base.entity';

@ObjectType()
export class Course extends PickType(CourseBase, [
  'id',
  'name',
  'description',
]) {
  @Field(() => [UserBase], { nullable: true })
  users: UserBase[];
}
