import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoleType } from '../../role/entities/role.entity';
import { Course } from '../../course/entities/course.entity';
import { pathFinderMiddleware } from '../middleware/path-finder.middleware';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  picture?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => RoleType)
  role: RoleType;

  @Field(() => [Course], { nullable: true })
  courses: Course[];
}
