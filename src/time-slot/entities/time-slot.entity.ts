import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { TimeSlotBase } from './time-slot-base.entity';

@ObjectType()
export class TimeSlot extends PickType(TimeSlotBase, [
  'id',
  'status',
  'start',
  'end',
]) {
  @Field(() => User)
  teacher: User;

  @Field(() => User, { nullable: true })
  student?: User;
}
