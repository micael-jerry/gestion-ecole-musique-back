import { Field, InputType } from '@nestjs/graphql';
import { ReservationTimeSlotInput } from './reservation.time-slot.input';
import { ArrayMinSize, IsArray } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field()
  studentId: string;

  @IsArray()
  @ArrayMinSize(1)
  @Field(() => [ReservationTimeSlotInput])
  timeSlots: ReservationTimeSlotInput[];
}
