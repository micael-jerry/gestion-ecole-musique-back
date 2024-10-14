import { Field, InputType } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';

@InputType()
export class UpdateReservationInput {
  @Field()
  id: string;

  @Field(() => ReservationStatus)
  status: ReservationStatus;
}
