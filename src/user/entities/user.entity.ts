import { Field, ID, ObjectType, PickType } from '@nestjs/graphql';
import { pathFinderMiddleware } from '../middleware/path-finder.middleware';
import { UserBase } from './user-base.entity';
import { RoleTypeBase } from '../../role/entities/role-base.entity';
import { CourseBase } from '../../course/entities/course-base.entity';
import { PaymentBase } from 'src/payment/entities/payment-base.entity';

@ObjectType()
export class User extends PickType(UserBase, [
  'id',
  'firstname',
  'lastname',
  'email',
  'address',
  'phone',
  'picture',
  'description',
]) {
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

  @Field(() => RoleTypeBase)
  role: RoleTypeBase;

  @Field(() => [CourseBase], { nullable: true })
  courses: CourseBase[];

  @Field(() => [PaymentBase], { nullable: true })
  payments: PaymentBase[];
}
