import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReservationTimeSlotInput {
  @Field()
  id: string;
}
