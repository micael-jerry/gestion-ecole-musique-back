import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { UserBase } from './user-base.entity';
import { RoleTypeBase } from '../../role/entities/role-base.entity';
import { CourseBase } from '../../course/entities/course-base.entity';
import { PaymentBase } from '../../payment/entities/payment-base.entity';
import { TimeSlotBase } from '../../time-slot/entities/time-slot-base.entity';

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
  @Field(() => RoleTypeBase)
  role: RoleTypeBase;

  @Field(() => [CourseBase], { nullable: true })
  courses: CourseBase[];

  @Field(() => [PaymentBase], { nullable: true })
  payments: PaymentBase[];

  @Field(() => [TimeSlotBase], { nullable: true })
  timeSlots: TimeSlotBase[];
}
