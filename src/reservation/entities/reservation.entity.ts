import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { ReservationBase } from './reservation-base.entity';
import { User } from '../../user/entities/user.entity';
import { TimeSlotBase } from '../../time-slot/entities/time-slot-base.entity';

@ObjectType()
export class Reservation extends PickType(ReservationBase, ['id', 'status']) {
  @Field(() => User)
  student: User;

  @Field(() => [TimeSlotBase])
  timeSlots: TimeSlotBase[];
}
