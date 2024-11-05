import { Field, InputType } from '@nestjs/graphql';
import { TimeSlotStatus } from '@prisma/client';

@InputType()
export class UpdateTimeSlotInput {
  @Field()
  id: string;

  @Field(() => TimeSlotStatus, { nullable: true })
  status?: TimeSlotStatus;

  @Field(() => Date, { nullable: true })
  start?: Date;

  @Field(() => Date, { nullable: true })
  end?: Date;
}
