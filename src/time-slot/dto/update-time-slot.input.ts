import { Field, InputType } from '@nestjs/graphql';
import { TimeSlotStatus } from '@prisma/client';

@InputType()
export class UpdateTimeSlotInput {
  @Field()
  id: string;

  @Field(() => TimeSlotStatus)
  status: TimeSlotStatus;
}
