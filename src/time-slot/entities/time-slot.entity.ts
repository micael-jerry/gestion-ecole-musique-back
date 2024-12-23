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
  @Field(() => User, { description: 'the teacher who owns the slot' })
  teacher: User;

  @Field(() => User, {
    nullable: true,
    description: 'the student with an accepted reservation',
  })
  student?: User;
}
